"use strict";

const imgSSIM = require("../lib");

//imgSSIM(
//    "https://octodex.github.com/images/original.png"
//  , "https://octodex.github.com/images/class-act.png"
//  , (err, similarity) => {
//    console.log(err || similarity);
//});

imgSSIM(
    "https://octodex.github.com/images/original.png"
  , "https://ionicabizau.net/images/logo.png"
  , { enforceSameSize: false }
  , (err, similarity) => {
    console.log(err || similarity);
});
