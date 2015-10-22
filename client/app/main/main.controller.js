'use strict';

angular.module('babadooApp')
  .controller('MainCtrl', function ($scope, $http, socket, Goods) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    Goods.findOne('5628d9adf73b2f85235fdb74').then(function(article) {
      $scope.article = article;
    });
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.addGoods = function () {
      $http.post('api/goods', {
        type: 'Футболка',
        title: 'First goods',
        description: 'First goods description',
        price: '123113',
        sellerId: 'String',
        keyWords: ['футболка', 'дешево'],
      })
    }
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
