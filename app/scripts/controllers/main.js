'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('MainCtrl', function ($scope, $timeout, Userloader) {

        var avatarUrl = 'https://www.gravatar.com/avatar/';

        var user = Userloader();

        user.then(function(data){
            $scope.user = data;
            loadUserSuccess();
        });

        $scope.zone = {
            name: '广东1区',
            enName: 'GD1'
        };


        $scope.setAvatar = function(){
            return {'background-image':  'url("'+ avatarUrl +'?s=80&amp;d=")'}
        };

        $scope.nav = {
            resources: [
                {
                    name: '主机',
                    enName: 'Instances',
                    icon: 'inbox',
                    link: '/horizon/instances/'
                },
                /*{
                    name: '硬盘',
                    enName: 'Volumes',
                    icon: 'hdd',
                    link: '/horizon/volumes/'
                },
                {
                    name: '备份',
                    enName: 'Snapshots',
                    icon: 'camera',
                    link: '/horizon/snapshots/'
                },*/
                {
                    name: '网络',
                    enName: 'Networks',
                    icon: 'tower',
                    link: '/horizon/networks/'
                },
                {
                    name: '公网IP',
                    enName: 'Elastic IPs',
                    icon: 'globe',
                    link: '/horizon/eips/'
                },

                {
                    name: '防火墙',
                    enName: 'Security Groups',
                    icon: 'flash',
                    link: '/horizon/security_groups/'
                },
                {
                    name: 'SSH密钥',
                    enName: 'Key Pairs',
                    icon: 'lock',
                    link: '/horizon/keypairs/'
                },
                {
                    name: '映像',
                    enName: 'Images',
                    icon: 'record',
                    link: '/horizon/images/'
                },
                {
                    name: '操作日志',
                    enName: 'Activities',
                    icon: 'time',
                    link: '/horizon/activities/'
                }/*,
                {
                    name: '回收站',
                    enName: 'Recycle Bin',
                    icon: 'trash',
                    link: '/horizon/recyclebin/'
                }*/
            ],
            others: [
                {
                    name: '负载均衡器',
                    enName: 'Load Balancers',
                    icon: 'random',
                    link: '/horizon/loadbalancers/'
                },
                {
                    name: '消费记录',
                    enName: 'Consumptions',
                    icon: 'credit-card',
                    link: '/horizon/consumptions/'
                },
                {
                    name: '工单',
                    enName: 'Tickets',
                    icon: 'question-sign',
                    link: '/horizon/tickets/'
                },
                {
                    name: 'API密钥',
                    enName: 'Access Keys',
                    icon: 'lock',
                    link: '/horizon/access_keys/'
                }
            ]
        };

        function loadUserSuccess(){
            var adminNav = {
                resources: [
                    {
                        name: '配置列表',
                        enName: 'Flavors',
                        icon: 'cog',
                        link: '/horizon/flavors/'
                    },
                    {
                        name: '租户列表',
                        enName: 'Tenants',
                        icon: 'list',
                        link: '/horizon/tenants/'
                    },
                    {
                        name: '用户列表',
                        enName: 'Users',
                        icon: 'user',
                        link: '/horizon/users/'
                    }
                ],
                others: [
                    {
                        name: '网站列表',
                        enName: 'Web sites',
                        icon: 'list-alt',
                        link: '/horizon/websites/'
                    },
                    {
                        name: '域名列表',
                        enName: 'Domains',
                        icon: 'th-list',
                        link: '/horizon/domains/'
                    }
                ]
            };
            avatarUrl = $scope.user.avatar;
            if($scope.user.isAdmin){
                $scope.nav.resources = $scope.nav.resources.concat(adminNav.resources);
                $scope.nav.others = adminNav.others.concat($scope.nav.others);
            }
        }

        $scope.selectItem = function(menuItem){
            if ($scope.$root.selectedNode)
                $scope.$root.selectedNode.selected = 0;

            menuItem.selected = 1;
            $scope.$root.selectedNode = menuItem;
        };

        $scope.tips = [];

        $scope.addTip = function(type, msg){
            var tip = {
                type: type,
                msg: msg
            };
            $scope.tips.push(tip);
            $timeout(function(){
                var index = $scope.tips.indexOf(tip);
                $scope.tips.splice(index, 1);
            },2000);
        }

  });
