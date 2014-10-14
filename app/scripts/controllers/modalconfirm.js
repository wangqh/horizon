'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModalconfirmCtrl
 * @description
 * # ModalconfirmCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('ModalconfirmCtrl', function ($scope, $modalInstance, alert) {
        $scope.alert = alert;

        switch (alert.type) {
            case 'success':
                $scope.alert.icon = 'ok-sign';
                break;
            case 'warning':
                $scope.alert.icon = 'warning-sign';
                break;
            case 'danger':
                $scope.alert.icon = 'exclamation-sign';
                break;
            case 'info':
            default :
                $scope.alert.icon = 'info-sign'
        }


        $scope.submit = function(){
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.dismiss = function(){
            $modalInstance.dismiss('close');
        }
  });
