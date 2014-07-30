'use strict';

angular.module('mean.drivers').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('drivers example page', {
      url: '/drivers/example',
      templateUrl: 'drivers/views/index.html'
    });
  }
]);
