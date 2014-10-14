'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModaldownloadkeypairCtrl
 * @description
 * # ModaldownloadkeypairCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('ModaldownloadkeypairCtrl', function ($scope, data, $modalInstance) {
        $scope.data = data;
        $scope.dismiss = function(){
            $modalInstance.dismiss('close');
        }
  });
