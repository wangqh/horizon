'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModalQuotesCtrl
 * @description
 * # ModalQuotesCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('ModalQuotesCtrl', function ($scope, $modalInstance, zone, quotes) {

        $scope.zone = zone;

        $scope.quotes = quotes;

        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
        };
  });
