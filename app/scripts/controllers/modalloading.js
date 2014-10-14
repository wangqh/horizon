'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModalloadingCtrl
 * @description
 * # ModalloadingCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('ModalloadingCtrl', function ($scope, $modalInstance, modal) {
        modal.opened.finally(function(){
            $modalInstance.dismiss('close');
        })
  });
