
[![img-ssim](http://i.imgur.com/tXlhphU.png)](#)

# img-ssim

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/img-ssim.svg)](https://www.npmjs.com/package/img-ssim) [![Downloads](https://img.shields.io/npm/dt/img-ssim.svg)](https://www.npmjs.com/package/img-ssim)

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


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
