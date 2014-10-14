'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Interfaceloader
 * @description
 * # Interfaceloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Interfaceloader', function Interfaceloader($q, $route, Interface) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mockData = {
            "message": "Get subnets info successfully!",
            "data": [
                {
                    id: "584831d4-a563-440a-911a-5e0286d19c39",
                    name: "demo_net1: 10.1.1.0/24 (demo_subnet1)"
                }
            ],
            "success": 0
        };
        var formRows = [
            {
                title: '子网',
                key: 'subnet_id',
                val:'',
                type: 'select',
                options: [],
                required: true
            },
            {
                title: '路由器名称',
                val:'',
                readonly: true,
                type: 'text'
            },
            {
                title: '路由器ID',
                val: $route.current.params.id,
                readonly: true,
                type: 'text'
            }
        ];


        return function(name){
            var delay = $q.defer();

            formRows[1].val = name;

            Interface.get({rid: $route.current.params.id}, function(result){
                formRows[0].options = result.data;
                delay.resolve(formRows);
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                formRows[0].options = mockData.data;
                delay.resolve(formRows);//测试用
                //delay.reject('unable to fetch router ')
            });
            return delay.promise;
        }
  });
