'use strict';

/**
 * @ngdoc service
 * @name horizonApp.homeloader
 * @description
 * # homeloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Homeloader', function Homeloader($q, Index) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            'success': 1,
            'message': 'Get index data successfully!',
            'data': {
                stats: {
                    "count_images": 13,
                    "count_instances": 3,
                    "count_networks": 3,
                    "count_load_balancers": 1,
                    "count_key_pairs": 3,
                    "count_routers": 2,
                    "count_public_ips": 9,
                    "count_security_groups": 5
                },
                tenants: [
                    {
                        "name": "admin",
                        "id": "2230a79a72c74876a6b2722ce2982820"
                    },
                    {
                        "name": "service",
                        "id": "575cc9bda2954281872e2b2795588a70"
                    },
                    {
                        "name": "invisible_to_admin",
                        "id": "b8010d1a87794354857f1110bc15f84b"
                    },
                    {
                        "name": "test",
                        "id": "bf1ad01deb7f446eb7260a2f45f256c0"
                    },
                    {
                        "name": "demo",
                        "id": "c9a301e6f6f3472cbf125344699083a9"
                    }
                ]
            }
        };


        return function(){
            var delay = $q.defer();

            Index.get( function(result){
                delay.resolve(result.data);
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                delay.resolve(mock.data);//测试用
                //delay.reject('unable to fetch router ')
            });
            return delay.promise;
        }
  });
