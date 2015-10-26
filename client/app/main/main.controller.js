'use strict';

angular.module('babadooApp')
  .controller('MainCtrl', function ($scope, $http, socket, Goods) {
    this.goods = [];

    console.log("Here's Katty!");

    $scope.awesomeThings = [];
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    // this.searchQuery = {
    //   page: 1,
    //   pageSize: 2,
    // };
    this.searchQuery = '?page=1&pageSize=2'

    Goods.searchQuery(this.searchQuery).then(function (data) {
      this.goods = data;
    }.bind(this));

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
