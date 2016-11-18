"use strict";

const imgSSIM = require("../lib");

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
