var window = {document: {}};
var getPixels = require('get-pixels');
var jsdom = require("jsdom");
var $ = require('jquery');
var fs = require('fs');

jsdom.env(
  '<div></div>',
  // ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    $ = $(window);
    console.log($('html').html()); 
    getPixels("test.png", function(err, pixels) {
      if(err) {
        console.log("Bad image path")
        return
      }
      var $html = $('html');
      // for(var i = 0; i < pixels.data.byteLength; i += 4) {
      //   var temp = $('<div></div>')
      //   .css({
      //     margin: 0,
      //     padding: 0,
      //     height: '2px',
      //     width: '2px',
      //     position: 'absolute',
      //     top: Math.floor(i / (pixels._shape1 * 4)) * 2 + 'px',
      //     left: (i % (pixels._shape2* 4))/4  * 2+ 'px',
      //     'background-color': 'rgba(' + pixels.data[i] + ',' + pixels.data[i + 1] + ',' + pixels.data[i + 2]+ ','  + pixels.data[i + 3] / 255+ ')'
      //   });
      //   $html.append(temp);
      //   if(i % 40 === 0){
      //     console.log(i);
      //   }
      // }
      writeFile($html.html());
      console.log(pixels.data);
    });

  }
);
var writeFile = function (data) {
  fs.writeFile("index.html", data);
}

