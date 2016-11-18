"use strict";

const ImageParser = require("image-parser")
    , sameTime = require("same-time")
    , ul = require("ul")
    ;

/**
 * imgSsim
 * Get the structural similarity between two images.
 *
 * The `ssim` result will be a value between `0` and `1`. The more similar the images are, the higher the value will be.
 *
 * @name imgSsim
 * @function
 * @param {String} source The first image path (local path or url).
 * @param {String} target The second image path (local path or url).
 * @param {Object} options An object containing the following fields:
 *
 *  - `windowSize` (Number): The number of pixels of the image splits (default: `8`).
 *  - `enforceSameSize` (Boolean): By default, the images should have the same size. If this option is `false`, this will force the images to be compared, even if they have different sizes.
 *  - `resize` (Boolean): If the images have different sizes, they will be resized if this option is `true`. Default is `false`.
 *
 * @param {Function} cb The callback function.
 */
module.exports = function imgSsim (source, target, options, cb) {

    if (typeof options === "function") {
        cb = options;
        options = {};
    }

    options = ul.merge(options, {
        windowSize: 8
      , K1: 0.01
      , K2: 0.03
      , luminance: true
      , bitsPerComponent: 8
      , enforceSameSize: true
      , resize: false
    });

    let windowSize = options.windowSize
      , K1 = options.K1
      , K2 = options.K2
      , luminance = options.luminance
      , bitsPerComponent = options.bitsPerComponent
      ;

    source = new ImageParser(source);
    target = new ImageParser(target);

    sameTime([
        done => source.parse(done)
      , done => target.parse(done)
    ], err => {
        if (err) { return cb(err); }

        if (options.enforceSameSize && (source.width() !== target.width() || source.height() !== target.height())) {
            return cb(new Error('Images have different sizes!'));
        }

        function computeChanges(source, target) {
            if (source.width() > target.width()) {
                let aux = target;
                target = source;
                source = aux;
            }

            let L = (1 << bitsPerComponent) - 1
              , c1 = Math.pow((K1 * L), 2)
              , c2 = Math.pow((K2 * L), 2)
              , numWindows = 0
              , mssim = 0.0
              , mcs = 0.0
              ;

            function _lumaValuesForWindow(image, x, y, width, height, luminance) {

                let lumaValues = new Float32Array(new ArrayBuffer(width * height * 4))
                  , counter = 0
                  ;

                let maxY = height + y
                  , maxX = width + x
                  , lumVals = {
                        r: luminance ? 0.212655 : 1
                      , g: luminance ? 0.715158 : 1
                      , b: luminance ? 0.072187 : 1
                    }
                  ;


                for (let cY = y; cY < maxY; ++cY) {
                    for (let cX = x; cX < maxX; ++cX) {
                        let cPixel = image.getPixel(cX, cY)
                          , res = (
                                cPixel.r * lumVals.r
                              + cPixel.g * lumVals.g
                              + cPixel.b * lumVals.b
                            ) * (cPixel.a)
                          ;

                        lumaValues[counter++] = res === res ? res : 0;
                    }
                }

                return lumaValues;
            }

            function _averageLuma(lumaValues) {
                let sumLuma = 0.0;
                for (let i = 0; i < lumaValues.length; i++) {
                    sumLuma += lumaValues[i];
                }
                return sumLuma / lumaValues.length;
            }

            function _iterate(image1, image2, windowSize, luminance, callback) {
                let width = image1.width()
                  , height = image1.height()
                  ;

                for (let y = 0; y < height; y += windowSize) {
                    for (let x = 0; x < width; x += windowSize) {

                        let windowWidth = Math.min(windowSize, width - x)
                          , windowHeight = Math.min(windowSize, height - y)
                          , lumaValues1 = _lumaValuesForWindow(
                                image1
                              , x, y
                              , windowWidth, windowHeight
                              , luminance
                            )
                          , lumaValues2 = _lumaValuesForWindow(
                                image2
                              , x, y
                              , windowWidth, windowHeight
                              , luminance
                            )
                          , averageLuma1 = _averageLuma(lumaValues1)
                          , averageLuma2 = _averageLuma(lumaValues2)
                          ;

                        callback(lumaValues1, lumaValues2, averageLuma1, averageLuma2);
                    }
                }
            }

            function iteration(lumaValues1, lumaValues2, averageLumaValue1, averageLumaValue2) {

                // calculate variance and covariance
                let sigxy = 0
                  , sigsqx = 0
                  , sigsqy = 0
                  ;

                for (let i = 0; i < lumaValues1.length; i++) {
                    sigsqx += Math.pow((lumaValues1[i] - averageLumaValue1), 2);
                    sigsqy += Math.pow((lumaValues2[i] - averageLumaValue2), 2);
                    sigxy += (lumaValues1[i] - averageLumaValue1) * (lumaValues2[i] - averageLumaValue2);
                }

                let numPixelsInWin = lumaValues1.length - 1;
                sigsqx /= numPixelsInWin;
                sigsqy /= numPixelsInWin;
                sigxy /= numPixelsInWin;

                // perform ssim calculation on window
                let numerator = (2 * averageLumaValue1 * averageLumaValue2 + c1) * (2 * sigxy + c2);
                let denominator = (
                    Math.pow(averageLumaValue1, 2)
                  + Math.pow(averageLumaValue2, 2)
                  + c1
                ) * (sigsqx + sigsqy + c2);

                mssim += numerator / denominator;
                mcs += (2 * sigxy + c2) / (sigsqx + sigsqy + c2);

                numWindows++;
            }

            _iterate(source, target, windowSize, luminance, iteration);

            cb(null, mssim / numWindows, mcs / numWindows);
        }

        if (options.resize) {
            target.resize(source.width(), source.height(), (err, target) => {
                if (err) { return cb(err); }
                computeChanges(source, target);
            });
        } else {
            computeChanges(source, target);
        }
    });
};
