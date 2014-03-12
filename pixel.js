
var getPixels = require('get-pixels');

var pixSize = 2;

getPixels("test.png", function (err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  console.log("got image data");
  var data = pixels.data;
  var length = data.byteLength;
  var width = pixSize;
  var temp = {};
  for (var i = 0; i < length; i += 4) {
    //if same
    if (data[i] === data[i - 4] && data[i + 1] === data[i - 3] && data[i + 2] === data[i - 2] && data[i + 3] === data[i - 1]) {
      width += pixSize;
      continue;
    } else {
      $(document.body).append("<div style=width:" + width + "px;top:" + temp.top + "px;left:" + temp.left + "px;background-color:" + temp.color + ";></div>");
    }
    //not same
    temp.top = Math.floor(i / (pixels._shape1 * 4)) * pixSize,
    temp.left = ((i / 4) % (pixels._shape1)) * pixSize;
    temp.color = 'rgba(' + data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3] / 255 + ')';
    width = pixSize;

    if (i % 400 === 0) console.log(i / length * 100 + '%');
  }
  // fs.writeFile("index.html", '<html><head><style>div{margin: 0; padding: 0;position:absolute;padding:0;margin:0;height:' + pixSize + 'px;width:' + pixSize + 'px;}</style></head><body>' + str + '</body></html>');
});