'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Modalconfirm
 * @description
 * # Modalconfirm
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Modalconfirm', function Modalconfirm($modal, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return function(options){
            var modalInstance = $modal.open({
                templateUrl: '/views/modalConfirm.html',
                controller: 'ModalconfirmCtrl',
                size: options.size,
                resolve: {
                    alert: function () {
                        return {
                            type: options.type,
                            msg: options.msg
                        };
                    }
                }
            });

            modalInstance.result.then(options.callback, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
  });
