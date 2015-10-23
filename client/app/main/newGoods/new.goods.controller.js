'use strict'

angular.module('babadooApp')
  .controller('NewGoodsCtrl', function ($scope, Goods, Auth) {

    this.goods_ = Goods;

    this.goods = Goods.createEmpty();
    this.currentUser = Auth.getCurrentUser();

    this.goods.sellerId = this.currentUser._id;

    this.addGoods = function () {
        console.log(this.goods);
        if (this.goods.create() === 201) {
            this.goods = Goods.createEmpty()
        } else {
            console.log('error');
        }
    }

  });