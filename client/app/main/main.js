'use strict';

angular.module('babadooApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('new-goods', {
        url: '/dobavit/',
        templateUrl: 'app/main/newGoods/new.goods.html',
        controller: 'NewGoodsCtrl as NewGoodsCtrl'
      })
  });