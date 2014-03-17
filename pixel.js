var getPixels = require('get-pixels');

var pixSize = 1;

$(document).ready(function () {

  //parse the image
  getPixels("ray.png", function (err, pixels) {
    if (err) {
      console.log("Bad image path");
      return;
    }


    console.log("got image data");
    var data = pixels.data;
    var length = data.byteLength;
    var width = pixSize;
    var temp = {};
    var arr = [];
    var i = 0;

    temp.top = ~~ (i / (pixels._shape1 * pixSize)) * pixSize;
    temp.left = ((i / pixSize) % (pixels._shape1)) * pixSize;
    temp.color = 'rgba(' + data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3] / 255 + ')';

    //arr of pixels
    for (i = 0; i < length; i += 4) {
      //if same
      if (data[i] === data[i - 4] && data[i + 1] === data[i - 3] && data[i + 2] === data[i - 2] && data[i + 3] === data[i - 1]) {
        width += pixSize;
        continue;
      } else {
        var startx = ~~ (Math.random() * 1000);
        var starty = ~~ (Math.random() * 1000);
        arr.push({
          width: width,
          top: temp.top,
          left: temp.left,
          color: temp.color,
          starty: starty,
          deltay: temp.top - starty,
          startx: startx,
          deltax: temp.left - startx

        });
      }
      //not same
      temp.top = ~~ (i / (pixels._shape1 * 4)) * pixSize;
      temp.left = ((i / 4) % (pixels._shape1)) * pixSize;
      temp.color = 'rgba(' + data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3] / 255 + ')';
      width = pixSize;

      if (i % 400 === 0) console.log(i / length * 100 + '%');
    }

    //drawing with canvas
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var numOfFrames = 50;
    var counter = 50;
    var draw = function () {
      ctx.clearRect(0, 0, 1000, 1000);
      console.log('drawing');
      //draw every shape
      for (var i = 0; i < arr.length; i++) {
        //draw shape
        var pixel = arr[i];
        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.startx, pixel.starty, pixel.width, 1);
        pixel.startx = pixel.startx + pixel.deltax / numOfFrames;
        pixel.starty = pixel.starty + pixel.deltay / numOfFrames;
      }
      if (--counter >= 0) window.setTimeout(draw, 30);
    };
    draw();
  });
});