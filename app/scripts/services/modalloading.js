'use strict';

/**
 * @ngdoc service
 * @name horizonApp.modalloading
 * @description
 * # modalloading
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Modalloading', function Modalloading($modal) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return function(modalInstance){
            var modalLoading = $modal.open({
                templateUrl: '/views/modalLoading.html',
                controller: 'ModalloadingCtrl',
                size: 'sm',
                resolve: {
                    modal: function(){
                        return modalInstance;
                    }
                }
            });
        }
  });
