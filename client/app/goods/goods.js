'use strict';

angular.module('babadooApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('goods', {
        url: '/goods/:id',
        controller: 'GoodsCtrl as GoodsCtrl',
        templateUrl: 'app/goods/goods/template.tpl',
      })
      .state('new-goods', {
        url: '/dobavit/',
        controller: 'NewGoodsCtrl as NewGoodsCtrl',
        templateUrl: 'app/goods/newGoods/new.goods.html',
      });
  });