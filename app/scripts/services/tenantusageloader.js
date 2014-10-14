'use strict';

/**
 * @ngdoc service
 * @name horizonApp.tenantusageloader
 * @description
 * # tenantusageloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Tenantusageloader', function Tenantusageloader($q, Tenant, $route) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            "message": "Get tenants info for usage successfully!",
            "data": {
                cpu: {
                    total: 10,
                    usage: 6
                },
                disk: {
                    total: 2000,
                    usage: 120
                },
                ram: {
                    total: 60,
                    usage: 20
                }
            },
            "success": 1
        };

        return function(){

            var delay = $q.defer();

            Tenant.get({op: 'usage', id: $route.current.params.id}, function(result){
                delay.resolve(result.data);
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                delay.resolve(mock.data);
                //delay.reject('unable to fetch router ')
            });
            return delay.promise;
        }
  });
