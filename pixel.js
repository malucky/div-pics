var getPixels = require('get-pixels');

var pixSize = 4;

$(document).ready(function () {

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

    temp.top = ~~ (i / (pixels._shape1 * 4)) * pixSize,
    temp.left = ((i / 4) % (pixels._shape1)) * pixSize;
    temp.color = 'rgba(' + data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3] / 255 + ')';
    width = pixSize;
    for (i = 0; i < length; i += 4) {
      //if same
      if (data[i] === data[i - 4] && data[i + 1] === data[i - 3] && data[i + 2] === data[i - 2] && data[i + 3] === data[i - 1]) {
        width += pixSize;
        continue;
      } else {
        arr.push({
          width: width,
          top: temp.top,
          left: temp.left,
          color: temp.color,
          starty: ~~(Math.random() * 1000),
          startx: ~~(Math.random() * 1000)

        });
        // $(document.body).append("<div style='width:" + width + "px;height:" + pixSize + "px;top:" + temp.top + "px;left:" + temp.left + "px;background-color:" + temp.color + ";'></div>");

      }
      //not same
      temp.top = ~~ (i / (pixels._shape1 * 4)) * pixSize,
      temp.left = ((i / 4) % (pixels._shape1)) * pixSize;
      temp.color = 'rgba(' + data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3] / 255 + ')';
      width = pixSize;

      if (i % 400 === 0) console.log(i / length * 100 + '%');
    }

    var body = d3.select('body').append('div');
    // body.attr('height', 1000);
    // body.attr('width', 1000);
    body.selectAll('div')
      .data(arr)
      .enter()
      .append('div')
      .style('width', '4px')
      .style('top', function (d, i) {
        return d.starty;
      })
      .style('left', function (d, i) {
        return d.startx;
      })
      .style('height', '4px')
      .style('background-color', function (d, i) {
        return d.color;
      })

    setTimeout(function () {



      body.selectAll('div')
        .style('-webkit-transform', function (d, i) {
          var offsetX = d.left - d.startx;
          var offsetY = d.top - d.starty;
          return 'translate(' + offsetX + 'px,' + offsetY + 'px)';
        })
      // .style('left', function (d, i) {
      //   return d.left;
      // })
      .style('width', function (d, i) {
        return d.width;
      });

    }, 0);
    // fs.writeFile("index.html", '<html><head><style>div{margin: 0; padding: 0;position:absolute;padding:0;margin:0;height:' + pixSize + 'px;width:' + pixSize + 'px;}</style></head><body>' + str + '</body></html>');
  });
});