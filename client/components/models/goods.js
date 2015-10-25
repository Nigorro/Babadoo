'use strict';

/**
 * https://makeomatic.ru/blog/2014/09/18/Angular_data_modelling/
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
      return status;
    }).error( function (data, status, headers, config) {
      console.log(status);
      return status;
    });
  };

  GoodsModel.prototype.update = function () {
    return $http.put(apiUrl + this._id, this).success(function() {
      console.log('Success!');
      return status;
    }).error(function(data, status, headers, config) {
      console.log('Error!', status);
      return status;
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

      $http.get(apiUrl + id).success(function (data) {
        deferred.resolve(new GoodsModel(data));
      }).error(function() {
        deferred.reject();
      });
      return deferred.promise;
    },

    removeByID: function (id) {
        $http.delete(apiUrl+id).success( function (data) {
          console.log('Goods', id, 'was removed!');
        }).error(function (){
          console.log('Error! Something was wrong!');
        })
    },

    getAllByUserId: function (id) {
      var deferred = $q.defer();
      var scope = this;
      var data = {};
      $http.get(apiUrl + 'user/' + id).success( function (result){
        result.forEach( function (data) {
          goods.push( new GoodsModel(data));
        });
        deferred.resolve(goods);
      }).error(function() {
        deferred.reject();
      });
    },

    searchQuery: function (searchQuery) {
      var deferred = $q.defer();
      var scope = this;
      var data = {};
      var goods = [];
      var query = searchQuery;
      $http.get(apiUrl + 'elastic/search/', query).success( function (result){
        result.hits.hits.forEach( function (data) {
          goods.push( new GoodsModel(data));
        });
        deferred.resolve(goods);
      }).error(function() {
        deferred.reject();
      });
      return deferred.promise;
    },

    createEmpty: function () {
      return new GoodsModel({});
    }
  };

  return goods;
});