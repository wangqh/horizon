'use strict';

/**
 * @ngdoc service
 * @name horizonApp.routerDetailLoader
 * @description
 * # routerDetailLoader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Routerdetailloader', function Routerdetailloader($q, $route, Router) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            "message": "Get router info successfully!",
            "data": {
                "status": "ACTIVE",
                "external_gateway_info": {
                    "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                    "network": "external_net1"
                },
                "name": "demo_router1",
                "admin_state_up": true,
                "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                "interfaces": [
                    {
                        "status": "ACTIVE",
                        "name": "",
                        "admin_state_up": true,
                        "network_id": "be79dc12-ef01-4fcc-99d5-cb1c1663a20b",
                        "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                        "binding:vif_type": "ovs",
                        "device_owner": "network:router_interface",
                        "binding:capabilities": {
                            "port_filter": false
                        },
                        "mac_address": "fa:16:3e:cf:5b:33",
                        "fixed_ips": [
                            {
                                "subnet_id": "584831d4-a563-440a-911a-5e0286d19c39",
                                "ip_address": "10.1.1.1"
                            }
                        ],
                        "id": "81b7ea0e-91ab-4c6b-9e90-1166ff48c6d0",
                        "device_id": "934bcffb-9028-4cde-9c86-819c80bba326"
                    },
                    {
                        "status": "DOWN",
                        "name": "",
                        "admin_state_up": true,
                        "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                        "tenant_id": "",
                        "binding:vif_type": "ovs",
                        "device_owner": "network:router_gateway",
                        "binding:capabilities": {
                            "port_filter": false
                        },
                        "mac_address": "fa:16:3e:e0:bf:ee",
                        "fixed_ips": [
                            {
                                "subnet_id": "84f7f6d7-d3e6-44b0-b129-d94ead323595",
                                "ip_address": "192.168.74.3"
                            }
                        ],
                        "id": "e4618e17-f363-4a8c-a0d8-625dac776bda",
                        "device_id": "934bcffb-9028-4cde-9c86-819c80bba326"
                    }
                ],
                "routes": [],
                "id": "934bcffb-9028-4cde-9c86-819c80bba326"
            },
            "success": 0
        };
        var detailData = {
            basicParams: {
                id: {
                    key: 'ID'
                },
                name: {
                    key: '名称'
                },
                status: {
                    key: '状态'
                },
                external_gateway_info: {
                    key: '外部网关信息'
                }
            },
            tableItems: [
                {
                    title: '接口',
                    toolbar: {
                        hasRefresh: false,
                        hasCreate: true,
                        handlebar: {
                            hasDelete: true
                        }
                    },
                    isCheckAll: false,
                    table: {
                        thead: [
                            {
                                type: 'checkbox'
                            },
                            {
                                text: '名称'
                            },
                            {
                                text: '内网 IP列表'
                            },
                            {
                                text: '状态'
                            },
                            {
                                text: '类别'
                            },
                            {
                                text: '管理员状态'
                            }
                        ],
                        tbody: []
                    }
                }
            ]
        };

        function setModel(data){

            detailData.id = data.id;
            detailData.title = data.name;
            detailData.basicParams = [
                {
                    key: 'ID',
                    val: data.id
                },
                {
                    key: '名称',
                    val: data.name
                },
                {
                    key: '状态',
                    val: data.status
                },
                {
                    key: '外部网关信息',
                    val: '连接上外部网络:'+ data.external_gateway_info.network
                }
            ];
        }

        return function(){
            var delay = $q.defer();
            Router.get({id: $route.current.params.id}, function(result){
                var trs = [];
                setModel(result.data);
                angular.forEach(result.data.interfaces, function(value){
                    var list = [];
                    angular.forEach(value.fixed_ips, function(val){
                        list.push(val.ip_address);
                    });
                    value.name = value.id.split('-')[0];
                    trs.push({
                        checked: false,
                        id: value.id,
                        tds: [
                            {
                                type: 'checkbox'
                            },
                            {
                                type: 'link',
                                path: '/horizon/networks/ports/' + value.id ,
                                text: value.name
                            },
                            {
                                type: 'list',
                                list: list
                            },
                            {
                                type: 'text',
                                text: value.status
                            },
                            {
                                type: 'text',
                                text: value.device_owner === 'network:router_interface' ? 'Internal Interface' : 'External Gateway'
                            },
                            {
                                type: 'text',
                                text: value.admin_state_up ? 'UP' : ''
                            }
                        ]
                    });
                });
                detailData.tableItems[0].table.tbody = trs;

                delay.resolve(detailData);
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                var trs = [];
                setModel(mock.data);
                angular.forEach(mock.data.interfaces, function(value){
                    var list = [] ;
                    angular.forEach(value.fixed_ips, function(val){
                        list.push(val.ip_address);
                    });
                    value.name = value.id.split('-')[0];
                    trs.push({
                        checked: false,
                        id: value.id,
                        tds: [
                            {
                                type: 'checkbox'
                            },
                            {
                                type: 'link',
                                path: '/horizon/networks/ports/' + value.id ,
                                text: value.name
                            },
                            {
                                type: 'list',
                                list: list
                            },
                            {
                                type: 'text',
                                text: value.status
                            },
                            {
                                type: 'text',
                                text: value.device_owner === 'network:router_interface' ? 'Internal Interface' : 'External Gateway'
                            },
                            {
                                type: 'text',
                                text: value.admin_state_up ? 'UP' : ''
                            }
                        ]
                    });
                });
                detailData.tableItems[0].table.tbody = trs;
                delay.resolve(detailData);//测试用
                delay.reject('unable to fetch router ' + $route.current.params.id)
            });
            return delay.promise;
        }
  });
