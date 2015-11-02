angular.module('babadooApp')
  .directive('imageResize', function ($parse) {
    return {
      link: function($scope, element, attrs) {
        // var imagePercent = $parse(attrs.imagePercent)(scope);
        // element.on('load', function () {
        //   var neededHeight = elm[0].height*imagePercent/100,
        //       neededWidth = elm[0].width*imagePercent/100;
        //       canvas = document.createElement "canvas",
        //       canvas.width = neededWidth,
        //       canvas.height = neededHeight,
        //       ctx.drawImage elm[0],0,0,neededWidth,neededHeight;
        //   element.attr('src', canvas.toDataURL  + "image/jpeg");
        // })
      }
    };
  });