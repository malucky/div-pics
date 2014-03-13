var getPixels = require('get-pixels');

var pixSize = 4;

$(document).ready(function () {

  getPixels("c.png", function (err, pixels) {
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
    for (i = 4; i < length; i += 4) {
      //if same
      if (data[i] === data[i - 4] && data[i + 1] === data[i - 3] && data[i + 2] === data[i - 2] && data[i + 3] === data[i - 1]) {
        width += pixSize;
        continue;
      } else {
        arr.push({
          width: width,
          top: temp.top,
          left: temp.left,
          color: temp.color
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

    var body = d3.select('body').append('svg');
    body.attr('height', 1000);
    body.attr('width', 1000);
    body.selectAll('rect')
      .data(arr)
      .enter()
      .append('rect')
      .attr('width', '4px')
      .attr('y', function (d, i) {
        return~~ (Math.random() * 1000);
      })
      .attr('x', function (d, i) {
        return~~ (Math.random() * 1000);
      })
      .attr('height', '4px')
      .attr('fill', function (d, i) {
        return d.color;
      })
      .transition()
      .duration(10000)
      .attr('y', function (d, i) {
        return d.top;
      })
      .attr('x', function (d, i) {
        return d.left;
      })
      .attr('width', function (d, i) {
        return d.width;
      });

    // fs.writeFile("index.html", '<html><head><style>div{margin: 0; padding: 0;position:absolute;padding:0;margin:0;height:' + pixSize + 'px;width:' + pixSize + 'px;}</style></head><body>' + str + '</body></html>');
  });
});