'use strict'

angular.module('babadooApp')
  .controller('GoodsCtrl', function ($scope, $stateParams, Goods) {

    this.goodsId = $stateParams.id;
    this.goods = {};

    Goods.findOne(this.goodsId).then( function (goods) {
        $scope.goods = goods;
    })
  });