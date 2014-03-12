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

var str = '';
getPixels("test.png", function (err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  for (var i = 0; i < pixels.data.byteLength; i += 4) {
    var top = ~~ (i / pixels._shape1 / 4 * pixSize) + 'px';
    var left = ((i / 4) % (pixels._shape1)) * pixSize + 'px';
    var color = 'rgba(' + pixels.data[i] + ',' + pixels.data[i + 1] + ',' + pixels.data[i + 2] + ',' + pixels.data[i + 3] / 255 + ')';
    str += "<div style=top:" + top + ";left:" + left + ";background-color:" + color + ";></div>";
    if (i % 400 === 0) console.log(i / pixels.data.byteLength * 100 + '%');
  }
  fs.writeFile("index.html", '<html><head><style>div{margin: 0; padding: 0;position:absolute;padding:0;margin:0;height:' + pixSize + 'px;width:' + pixSize + 'px;}</style></head><body>' + str + '</body></html>');
});