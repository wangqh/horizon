'use strict';

/**
 * @ngdoc service
 * @name horizonApp.vxnetdetailloader
 * @description
 * # vxnetdetailloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Vxnetdetailloader', function Vxnetdetailloader($q, $route, Vxnet) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
                "message": "Get network successfully!",
                "data": {
                    "status": "ACTIVE",
                    "subnets": [
                        {
                            "name": "luojun",
                            "enable_dhcp": true,
                            "network_id": "af82b8b3-f05f-4aa7-918c-5d356a7dcbfa",
                            "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                            "dns_nameservers": [
                                "8.8.8.8"
                            ],
                            "allocation_pools": [
                                {
                                    "start": "192.168.77.3",
                                    "end": "192.168.77.9"
                                }
                            ],
                            "host_routes": [],
                            "ip_version": 4,
                            "gateway_ip": "192.168.77.1",
                            "cidr": "192.168.77.0/24",
                            "id": "773aed7a-b935-4bf0-a293-305a9d3dca68"
                        }
                    ],
                    "name": "LuoBang",
                    "provider:physical_network": null,
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "interfaces": [
                        {
                            "status": "ACTIVE",
                            "name": "",
                            "admin_state_up": true,
                            "network_id": "af82b8b3-f05f-4aa7-918c-5d356a7dcbfa",
                            "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                            "binding:vif_type": "ovs",
                            "device_owner": "network:dhcp",
                            "binding:capabilities": {
                                "port_filter": false
                            },
                            "mac_address": "fa:16:3e:4f:32:47",
                            "fixed_ips": [
                                {
                                    "subnet_id": "773aed7a-b935-4bf0-a293-305a9d3dca68",
                                    "ip_address": "192.168.77.3"
                                }
                            ],
                            "id": "2bc63d33-0fec-4ab0-9e07-2496c5fa6502",
                            "device_id": "dhcp2e59ba01-7d42-5a44-a9ef-8d0e740f77ff-af82b8b3-f05f-4aa7-918c-5d356a7dcbfa"
                        }
                    ],
                    "provider:network_type": "gre",
                    "router:external": false,
                    "shared": false,
                    "id": "af82b8b3-f05f-4aa7-918c-5d356a7dcbfa",
                    "provider:segmentation_id": 3
                },
                "success": 0
            };
        var detailData = {
            title: '',
            basicParams: [],
            tableItems: [
                {
                    title: '子网',
                    toolbar: {
                        hasRefresh: false,
                        hasCreate: true,
                        handlebar: {
                            hasChange: true,
                            hasDelete: true
                        }
                    },
                    table: {
                        isCheckAll: false,
                        thead: [
                            {
                                type: 'checkbox'
                            },
                            {
                                text: '名称'
                            },
                            {
                                text: '网络地址'
                            },
                            {
                                text: 'IP 版本'
                            },
                            {
                                text: '网关 IP'
                            }
                        ],
                        tbody: []
                    }
                },
                {
                    title: '端口',
                    toolbar: {
                        hasRefresh: false,
                        hasCreate: false,
                        handlebar: {
                            hasChange: true,
                            hasDelete: false
                        }
                    },
                    table: {
                        isCheckAll: false,
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
                                text: '挂载驱动'
                            },
                            {
                                text: '状态'
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
        function setBasicParams(data){
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
                        key: '管理员状态',
                        val: data.admin_state_up ? 'UP' : ''
                    },
                    {
                        key: '共享',
                        val: data.shared ? 'True' : 'False'
                    },
                    {
                        key: '外部网络',
                        val: data['router:external'] ? 'True' : 'False'
                    }
            ]
        }
        return function(){
            var delay = $q.defer();
            Vxnet.get({id: $route.current.params.id}, function(result){
                var trs = [], trs2 = [];
                setBasicParams(result.data);

                angular.forEach(result.data.subnets, function(value){
                    angular.extend(value, {
                        checked: false,
                        id: value.id,
                        tds: [
                            {
                                type: 'checkbox'
                            },
                            {
                                type: 'link',
                                path: '/horizon/networks/subnets/' + value.id ,
                                text: value.name
                            },
                            {
                                type: 'text',
                                text: value.cidr
                            },
                            {
                                type: 'text',
                                text: 'IPv' + value.ip_version
                            },
                            {
                                type: 'text',
                                text: value.gateway_ip
                            }
                        ]
                    });
                    trs.push(value);
                });
                angular.forEach(result.data.interfaces, function(value){
                    var list = [] ;
                    angular.forEach(value.fixed_ips, function(val){
                        list.push(val.ip_address);
                    });
                    value.name = value.name ? value.name : value.id.split('-')[0];
                    angular.extend(value, {
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
                    trs2.push(value);
                });
                detailData.tableItems[0].table.tbody = trs;
                detailData.tableItems[1].table.tbody = trs2;

                delay.resolve(detailData);
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                var trs = [], trs2 = [];
                setBasicParams(mock.data);
                angular.forEach(mock.data.subnets, function(value){
                    angular.extend(value, {
                        checked: false,
                        id: value.id,
                        tds: [
                            {
                                type: 'checkbox'
                            },
                            {
                                type: 'link',
                                path: '/horizon/networks/subnets/' + value.id ,
                                text: value.name
                            },
                            {
                                type: 'text',
                                text: value.cidr
                            },
                            {
                                type: 'text',
                                text: 'IPv' + value.ip_version
                            },
                            {
                                type: 'text',
                                text: value.gateway_ip
                            }
                        ]
                    });
                    trs.push(value);
                });
                angular.forEach(mock.data.interfaces, function(value){
                    var list = [] ;
                    angular.forEach(value.fixed_ips, function(val){
                        list.push(val.ip_address);
                    });
                    value.name = value.name ? value.name : value.id.split('-')[0];
                    angular.extend(value, {
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
                    trs2.push(value);
                });
                detailData.tableItems[0].table.tbody = trs;
                detailData.tableItems[1].table.tbody = trs2;
                delay.resolve(detailData);//测试用
                delay.reject('unable to fetch router ' + $route.current.params.id)
            });
            return delay.promise;
        }
  });
