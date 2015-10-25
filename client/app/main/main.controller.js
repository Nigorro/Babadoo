'use strict';

angular.module('babadooApp')
  .controller('MainCtrl', function ($scope, $http, socket, Goods) {

    $scope.awesomeThings = [];
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });
    // this.goods = $scope.goods;
    this.searchQuery = {
      page: 1,
      pageSize: 2,
    };
    Goods.searchQuery(this.searchQuery).then(function (data) {
      var self = this;
      self.goods = data;
    })
    console.log(this.goods);
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.post('/api/things/delete/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
