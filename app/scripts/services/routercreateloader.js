'use strict';

/**
 * @ngdoc service
 * @name horizonApp.routercreateloader
 * @description
 * # routercreateloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Routercreateloader', function Routercreateloader($q, Router) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mockData = {
            "subnets": [ //内部网络
                {
                    id: "584831d4-a563-440a-911a-5e0286d19c39",
                    name: "demo_net1: 10.1.1.0/24 (demo_subnet1)"
                }
            ],
            "networks": [ //外部网络
                {
                    id: "efb8ac42-0870-43b5-960c-f21bf0552e16",
                    name: "external_net1"
                }
            ]
        };



        return function($scope){
            var formRows = [
                /*{
                    title: '名称',
                    key: 'name',
                    val:'',
                    type: 'text',
                    required: true,
                    autofocus: true
                },*/
                {
                    title: '内部网络',
                    key: 'subnet_id',
                    val:'',
                    type: 'select',
                    options: [],
                    required: false
                },
                {
                    title: '外部网络',
                    key: 'network_id',
                    val:'',
                    type: 'select',
                    options: [],
                    required: false
                }
            ];
            var delay = $q.defer();

            Router.get({id: 'create'}, function(result){
                formRows[0].options = result.subnets;
                formRows[1].options = result.networks;
                delay.resolve(formRows);
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                formRows[0].options = mockData.subnets;
                formRows[1].options = mockData.networks;
                delay.resolve(formRows);//测试用
                //delay.reject('unable to fetch router ')
            });
            return delay.promise;
        }
  });
