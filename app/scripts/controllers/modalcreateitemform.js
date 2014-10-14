'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModalcreateitemformCtrl
 * @description
 * # ModalcreateitemformCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('ModalcreateitemformCtrl', function ($scope, $modalInstance, title, formModel) {

        $scope.title = title;
        $scope.form = formModel;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.dismiss = function(){
            $modalInstance.dismiss('close');
        }
  });
