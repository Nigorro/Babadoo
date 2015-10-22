'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('babadooApp')
  .factory('Goods', function ($http, $q) {
    var apiUrl = '/api/goods/';

    var GoodsModel = function (data) {
      if (data) {
        this.setData(data);
    };
  };

  GoodsModel.prototype.setData = function (data) {
    angular.extend(this, data);
  };

  GoodsModel.prototype.create = function () {
    $http.post(apiUrl, this).success(function (data, status, headers, config) {
      console.log(status);
    }).error( function (data, status, headers, config) {
      console.log(status);
    });
  };

  GoodsModel.prototype.update = function () {
    return $http.put(apiUrl + this._id, this).success(function() {
      console.log('Success!');
    }).error(function(data, status, headers, config) {
      console.log('Error!', status);
    });
  }

  var goods = {
    findAll: function () {
      var deferred = $q.defer();
      var scope = this;
      var goods = [];
      $http.get(apiUrl).success( function (result){
        result.forEach( function (data) {
          goods.push( new GoodsModel(data));
        });
        deferred.resolve(goods);
      }).error(function() {
        deferred.reject();
      });
      return deferred.promise;
    },

    findOne: function (id) {
      var deferred = $q.defer();
      var scope = this;
      var data = {};

      $http.get(apiUrl + id).success(function(data) {
        deferred.resolve(new GoodsModel(data));
      }).error(function() {
        deferred.reject();
      });
      return deferred.promise;
    },

    delete: function (id) {
        console.log(id);
    },

    createEmpty: function () {
      return new GoodsModel({});
    }
  };

  return goods;
});