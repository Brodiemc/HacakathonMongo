'use strict';

angular.module('mean.drivers').controller('DriversController', ['$scope', 'Global', 'Drivers',
  function($scope, Global, Drivers) {
    $scope.global = Global;
    $scope.package = {
      name: 'drivers'
    };
  }
]);
