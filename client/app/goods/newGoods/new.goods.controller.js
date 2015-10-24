'use strict'

angular.module('babadooApp')
  .controller('NewGoodsCtrl', function ($scope, Goods, Auth) {

    this.goods_ = Goods;

    this.goods = Goods.createEmpty();
    this.currentUser = Auth.getCurrentUser();

    this.addGoods = function () {
        this.goods.sellerId = this.currentUser._id;
        this.goods.photos = [{
            original: 'https://placeimg.com/640/490/nature',
            thumbnail: 'https://placeimg.com/240/128/nature',
        },{
            original: 'https://placeimg.com/640/490/nature',
            thumbnail: 'https://placeimg.com/240/128/nature',
        },{
            original: 'https://placeimg.com/640/490/nature',
            thumbnail: 'https://placeimg.com/240/128/nature',
        },{
            original: 'https://placeimg.com/640/490/nature',
            thumbnail: 'https://placeimg.com/240/128/nature',
        },{
            original: 'https://placeimg.com/640/490/nature',
            thumbnail: 'https://placeimg.com/240/128/nature',
        }]
        this.goods.create()
        this.goods = Goods.createEmpty();
        console.log('createEmpty')
    }

  });