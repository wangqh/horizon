'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModalchangeitemCtrl
 * @description
 * # ModalchangeitemCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
    .controller('ModalchangeitemCtrl', function ($scope, $modalInstance, item, title) {

        $scope.title = title;

        $scope.formData = {
            name: item.name
        };

        $scope.submit = function(){
            $modalInstance.close($scope.formData);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.dismiss = function(){
            $modalInstance.dismiss('close');
        }

    });
