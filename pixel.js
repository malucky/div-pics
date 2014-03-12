var window = {
  document: {}
};
var getPixels = require('get-pixels');
var jsdom = require("jsdom");
var $ = require('jquery');
var fs = require('fs');
var arr = [];

var pixSize = 2;

var writeFile = function (data) {
  console.log('writing file');
  fs.writeFile("index.html", data);
};

jsdom.env(
  '<div"></div>',
  // ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    $ = $(window);
    console.log($('html').html());
    getPixels("test.png", function (err, pixels) {
      if (err) {
        console.log("Bad image path");
        return;
      }
      var $html = $('html');
      $html.append('<style>div{position:absolute;padding:0;margin:0;height:' + pixSize + 'px;width:' + pixSize + 'px;}</style>');
      for (var i = 0; i < pixels.data.byteLength; i += 4) {
        var temp = $('<div></div>')
          .css({
            top: Math.floor(i / (pixels._shape1 * 4)) * 2 + 'px',
            left: (i % (pixels._shape2 * 4)) / 4 * 2 + 'px',
            'background-color': 'rgba(' + pixels.data[i] + ',' + pixels.data[i + 1] + ',' + pixels.data[i + 2] + ',' + pixels.data[i + 3] / 255 + ')'
          });
        arr.push(temp);
        if (i % 400 === 0) console.log(i / pixels.data.byteLength * 100 + '%');
      }
      $html.append(arr);
      writeFile($html.html());
    });

  }
);