
[![img-ssim](http://i.imgur.com/tXlhphU.png)](#)

# img-ssim

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/img-ssim.svg)](https://www.npmjs.com/package/img-ssim) [![Downloads](https://img.shields.io/npm/dt/img-ssim.svg)](https://www.npmjs.com/package/img-ssim) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Get the structural similarity between two images.

## :cloud: Installation

```sh
$ npm i --save img-ssim
```


## :clipboard: Example



```js
const imgSSIM = require("img-ssim");

imgSSIM(
    "https://octodex.github.com/images/original.png"
  , "https://octodex.github.com/images/class-act.png"
  , (err, similarity) => {
    console.log(err || similarity);
    // => 0.7683075604309328
});

imgSSIM(
    "https://octodex.github.com/images/original.png"
  , "https://ionicabizau.net/images/logo.png"
  , { enforceSameSize: false, resize: true }
  , (err, similarity) => {
    console.log(err || similarity);
    // => 0.2631629323319616
});
```

## :memo: Documentation

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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
