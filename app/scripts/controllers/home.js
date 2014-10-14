'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('HomeCtrl', function ($scope, $rootScope, home, $resource) {

        if($scope.user.isAdmin){
            $scope.tenant = {};

            $scope.listTenant = home.tenants;

            $scope.tenant.id = home.tenants[0].id;

            var Tenant = $resource('/project/horizon/auth/switch/:id');

            $scope.selectTenant = function(){
                Tenant.get({id: $scope.tenant.id}, function(result){
                    //$scope.addTip(result.success ? 'success' : 'danger', result.message);
                    home.stats = result.data;
                    updateList();
                })
            }
        }

        function updateList(){
            $scope.listResource = [
                {
                    link: '/horizon/instances/',
                    name: '主机',
                    count: home.stats.count_instances,
                    icon: 'inbox'
                },
                {
                    link: '/horizon/networks/routers/',
                    name: '路由器',
                    count: home.stats.count_routers,
                    icon: 'tower'
                },
                {
                    link: '/horizon/networks/vxnets/',
                    name: '私有网络',
                    count: home.stats.count_networks,
                    icon: 'transfer'
                },
                {
                    link: '/horizon/eips/',
                    name: '公网IP',
                    count: home.stats.count_public_ips,
                    icon: 'globe'
                },
                {
                    link: '/horizon/loadbalancers/',
                    name: '负载均衡器',
                    count: home.stats.count_load_balancers,
                    icon: 'random'
                },
                {
                    link: '/horizon/security_groups/',
                    name: '防火墙',
                    count: home.stats.count_security_groups,
                    icon: 'flash'
                },
                {
                    link: '/horizon/keypairs/',
                    name: 'SSH密钥',
                    count: home.stats.count_key_pairs,
                    icon: 'lock'
                },
                {
                    link: '/horizon/images/',
                    name: '映像',
                    count: home.stats.count_images,
                    icon: 'record'
                }
            ];
        }
        updateList();

  });
