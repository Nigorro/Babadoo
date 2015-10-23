'use strict';

/**
 * Goods preview directive
 */
angular.module('babadooApp')
  .controller('GoodsSmallDirectiveCtrl', function ($scope, Goods) {
    this.goods = $scope.goods;
    console.log(this.goods);


    this.removeGoods = function (id) {
      Goods.deleteByID(id);
      // console.log(id);
    }
  })




angular.module('babadooApp')
  .directive('goodsSmall', function () {
    return {
      restrict: 'EA',
      controller: 'GoodsSmallDirectiveCtrl as GoodsSmallDirectiveCtrl',
      templateUrl: '../components/directives/goodsSmall/template.tpl',
      scope: {
        goods: '=goodsSmall',
      },
      link: function(scope, element, attrs, ngModel) {
        console.log('goodsSmall directive!');
      }
    };
  });