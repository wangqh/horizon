'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:TopologyCtrl
 * @description
 * # TopologyCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('TopologyCtrl', function ($scope, topologyData) {
    $scope.topologyData = topologyData;
  });
