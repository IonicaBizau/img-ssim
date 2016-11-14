"use strict";

const tester = require("tester")
    , imgSSIM = require("..")
    ;

tester.describe("img-ssim", t => {
    t.should("Get the SSIM similarity between two images.", cb => {
        imgSSIM(
            "https://octodex.github.com/images/original.png"
          , "https://octodex.github.com/images/class-act.png"
          , (err, similarity) => {
                t.expect(err).toBe(null);
                t.expect(similarity > 0.7).toBe(true);
                cb();
        });
    });
});
