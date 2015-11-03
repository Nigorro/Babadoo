'use strict'
//http://www.bennadel.com/blog/2421-creating-angularjs-controllers-with-instance-methods.htm
angular.module('babadooApp')
  .controller('NewGoodsCtrl',[ '$scope', '$timeout', '$http', 'Upload', 'Goods', 'Auth', 
    function controller ($scope, $timeout, $http, Upload, Goods, Auth) {

    this.goods_ = Goods;
    this.informationStatus = false;
    this.goods = Goods.createEmpty();
    this.currentUser = Auth.getCurrentUser();
    this.files = [];
    // $scope.$watch('goods', function(newVal) {
    //     var self = this;
    //     console.log(newVal,this.goods, self.goods);
    // }).bind(this);

    this.uploadFiles = function (files, path) {
        if (files && files.length) {
            Upload.upload({
                url: 'api/upload',
                data: {
                    files: files, 
                    saveTo: '!'
                }
            }).then(function (response) {
                this.goods.photos = response.data;
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

    this.addGoods = function () {
      var self = this;

      this.goods.sellerId = this.currentUser._id;
      this.goods.photos = [];
      this.goods.create().then( function(goods) {
          $scope.goods = goods;
          if (goods._id) {
              if (self.files && self.files.length) {
                  Upload.upload({
                      url: 'api/upload',
                      data: {
                          files: self.files, 
                          saveTo: goods._id
                      }
                  }).then(function (response) {
                          $scope.result = response;
                          self.goods.photos = response.data;
                          self.goods.update(goods._id, self.goods);
                  });
              }
          };
      });
      
      // this.goods = Goods.createEmpty();
      console.log('createEmpty')
    }

    this.filesToUpload = function (files) {
        console.log(files);
        this.files = files;
    }
  }]);