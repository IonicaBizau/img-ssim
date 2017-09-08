## Documentation

You can see below the API reference of this module.

### `imgSsim(source, target, options, cb)`
Get the structural similarity between two images.

The `ssim` result will be a value between `0` and `1`. The more similar the images are, the higher the value will be.

#### Params

- **String** `source`: The first image path (local path or url).
- **String** `target`: The second image path (local path or url).
- **Object** `options`: An object containing the following fields:
 - `windowSize` (Number): The number of pixels of the image splits (default: `8`).
 - `enforceSameSize` (Boolean): By default, the images should have the same size. If this option is `false`, this will force the images to be compared, even if they have different sizes.
 - `resize` (Boolean): If the images have different sizes, they will be resized if this option is `true`. Default is `false`.
- **Function** `cb`: The callback function.

