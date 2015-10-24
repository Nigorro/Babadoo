'use strict';

/**
 * Goods preview directive
 */
angular.module('babadooApp')
  .controller('GoodsBigDirectiveCtrl', function ($scope, Goods) {
    this.goods = $scope.goods;
    console.log(this.goods);
  })




angular.module('babadooApp')
  .directive('goodsBig', function () {
    return {
      restrict: 'EA',
      controller: 'GoodsBigDirectiveCtrl as GoodsBigDirectiveCtrl',
      templateUrl: '../components/directives/goodsBig/template.tpl',
      scope: {
        goods: '=goodsBig',
      },
      // link: function(scope, element, attrs, ngModel) {
      //   console.log('goodsBig directive!');
      // }
    };
  });