'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('DetailCtrl', function ($scope, $location, $log, $routeParams, $modal, detail, Interface, Subnet, Port, Interfaceloader, Routerdetailloader) {

        $scope.detail = detail;

        $scope.twoCol = !!detail.tableItems || !!detail.tabs;

        var arrPath = $location.path().split('/');
        var parentWord = '';
        angular.forEach(arrPath, function (value, key) {
            if(value == $routeParams.id){
                parentWord = arrPath[key-1];
            }
        });
        if($routeParams.op == 'system'){
            $scope.parent= {
                title:  '系统映像',
                path: '/horizon/images/system'
            };
        } else if($routeParams.op == 'self'){
            $scope.parent= {
                title:  '自有映像',
                path: '/horizon/images/self'
            };
        }
        switch (parentWord) {
            case 'routers':
                $scope.parent= {
                    title:  '路由器',
                    path: '/horizon/networks/routers'
                };
                break;
            case 'vxnets':
                $scope.parent= {
                    title:  '私有网络',
                    path: '/horizon/networks/vxnets'
                };
                break;
            case 'instances':
                $scope.parent= {
                    title:  '主机',
                    path: '/horizon/instances'
                };
                break;
            case 'ports':
                $scope.parent= {
                    title:  '端口',
                    path: '/horizon/networks'
                };
                break;
            case 'subnets':
                $scope.parent= {
                    title:  '子网',
                    path: '/horizon/networks/vxnets'
                };
                break;
        }
        $scope.checkAll = function(item){
            angular.forEach(item.table.tbody, function (value) {
                value.checked = item.isCheckAll;
            });
        };

        $scope.updateHandlebarStatus = function(item){
            var count = 0;
            angular.forEach(item.table.tbody, function (value) {
                count = value.checked ? count+1 : count;
            });
            item.toolbar.handleDisabled = !count;
            item.toolbar.notSigleChecked = count !== 1;
            item.isCheckAll = !!count;
        };

        $scope.createRow = function(item) {

            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function (Interfaceloader) {
                        switch (item.title) {
                            case '接口':
                                return Interfaceloader(detail.title);
                                break;
                            case '子网':
                                return subnetCreateForm();
                                break;
                        }
                    },
                    title: function(){
                        return item.title;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                //$log.log(formData);
                switch (item.title) {
                    case '接口':
                        saveInterface(formData);
                        break;
                    case '子网':
                        return saveSubnet(formData, item);
                        break;
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });





            function saveInterface(formData){
                Interface.save({rid: detail.id}, formData, function(result){
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                    if(result.success){
                        var trs = [];
                        angular.forEach(result.data, function(value){
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
                                        path: '/horizon/networks/ports/' + value.id,
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
                        item.table.tbody = trs;
                    }
                },function(){
                    var trs = [];
                    var mock = [
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
                    ];
                    angular.forEach(mock, function(value){
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
                    item.table.tbody = trs;
                });
            }
        };

        function saveSubnet(formData, item, row){
            var params = {
                id: detail.id,
                sid: row ? row.id : null,
                op: row ? 'update': 'create'
            };
            Subnet.save(params, formData, function(result){
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
                if(result.success){
                    var trs = [];
                    angular.forEach(result.data, function(value){
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
                    item.table.tbody = trs;
                    $scope.updateHandlebarStatus(item);
                }
            }, function(){
                var trs = [];
                var mock = [
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
                    },
                    {
                        "name": "luojun2",
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
                ];
                angular.forEach(mock, function(value){
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
                item.table.tbody = trs;
                $scope.updateHandlebarStatus(item);
            });

        }

        function savePort(formData, item, row){
            Port.save({nid: detail.id, id: row.id, op: 'update'}, formData, function(result){
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
                if(result.success){
                    var trs = [];
                    angular.forEach(result.data, function(value){
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
                        trs.push(value);
                    });
                    item.table.tbody = trs;
                    $scope.updateHandlebarStatus(item);
                }
            }, function(){
                var mock = {
                    "message": "Get network successfully!",
                    "data": [
                        {
                            "status": "ACTIVE",
                            "name": formData.name,
                            "admin_state_up": formData.admin_state_up,
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
                    "success": 1
                };
                if(mock.success){
                    var trs = [];
                    angular.forEach(mock.data, function(value){
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
                        trs.push(value);
                    });
                    item.table.tbody = trs;
                    $scope.updateHandlebarStatus(item);
                }
            });
        }

        function portUpdateForm(row){
            var formGroup = [
                {
                    title: 'ID',
                    val: row.id,
                    type: 'static'
                },
                {
                    title: '名称',
                    key: 'name',
                    val: row.name ,
                    type: 'text',
                    required: true
                },
                {
                    title: '管理员状态',
                    key: 'admin_state_up',
                    val: row.admin_state_up,
                    type: 'checkbox'
                }
            ];
            return formGroup;
        }

        function subnetCreateForm(row) {
            var formGroup = {
                update: !!row,
                tabs: []
            };
            var routes = '';
            if(row && row.host_routes){
                angular.forEach(row.host_routes, function (value, key) {
                    routes += value.destination + ',' + value.nexthop + '\n';
                });
            }

            formGroup.tabs = [
                {
                    title: '设置子网',
                    formGroup: [
                        {
                            title: '创建子网',
                            key: 'with_subnet',
                            val: false,
                            type: 'checkbox',
                            required: false
                        },
                        {
                            title: '子网名称',
                            key: 'subnet_name',
                            val: row && row.name || '',
                            type: 'text',
                            required: true
                        },
                        {
                            title: '网络地址',
                            key: 'cidr',
                            val: row && row.cidr || '',
                            type: 'text',
                            required: false,
                            readonly: row && true
                        },
                        {
                            title: 'IP版本',
                            key: 'ip_version',
                            val: row && row.ip_version,
                            type: 'select',
                            options: [
                                {
                                    name: 'IPv4',
                                    id: '4'
                                },
                                {
                                    name: 'IPv6',
                                    id: '6'
                                }
                            ],
                            required: false
                        },
                        {
                            title: '网关IP（可选的）',
                            key: 'gateway_ip',
                            val: row && row.gateway_ip || '',
                            type: 'text',
                            required: false
                        },
                        {
                            title: 'Disable Gateway',
                            key: 'no_gateway',
                            val: row && !row.gateway_ip,
                            type: 'checkbox',
                            required: false
                        }
                    ]
                },
                {
                    title: '子网详情',
                    formGroup: [
                        {
                            title: 'Enable DHCP',
                            key: 'enable_dhcp',
                            val: row && row.enable_dhcp ,
                            type: 'checkbox',
                            required: false
                        },
                        {
                            title: 'Allocation Pools',
                            key: 'allocation_pools',
                            val: '',
                            type: 'textarea',
                            required: false
                        },
                        {
                            title: 'DNS Name Servers',
                            key: 'dns_nameservers',
                            val: row && row.dns_nameservers.join(',') || '',
                            type: 'textarea',
                            required: false
                        },
                        {
                            title: 'Host Routes',
                            key: 'host_routes',
                            val: routes,
                            type: 'textarea',
                            required: false
                        }
                    ]
                }
            ];
            if(row) {
                formGroup.tabs[0].formGroup.shift();
                formGroup.tabs[1].formGroup.splice(1,1);
            }
            return formGroup;
        }

        $scope.changeItem = function(item){
            if(item.toolbar.notSigleChecked)
                return ;
            var row;
            angular.forEach(item.table.tbody, function (value) {
                if(value.checked){
                    row = value;
                }
            });
            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function () {
                        switch (item.title) {
                            case '子网':
                                return subnetCreateForm(row);
                                break;
                            case '端口':
                                return portUpdateForm(row);
                                break;
                        }
                    },
                    title: function(){
                        return item.title;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                switch (item.title) {
                    case '子网':
                        return saveSubnet(formData, item, row);
                        break;
                    case '端口':
                        return savePort(formData, item, row);
                        break;
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };



        $scope.removeItems = function(item){
            if(item.toolbar.handleDisabled)
                return ;

            var list = [],
                ids = [],
                Obj = null,
                params = {};
            angular.forEach(item.table.tbody, function (value) {
                if(!value.checked){
                    list.push(value);
                } else {
                    ids.push(value.id);
                }
            });
            switch (item.title) {
                case '接口':
                    Obj = Interface;
                    params = {
                        rid: detail.id,
                        op: 'removeinterface'
                    };
                    break;
                case '子网':
                    Obj = Subnet;
                    params = {
                        id: detail.id,
                        op: 'delete'
                    };
                    break;
            }
            Obj.save(params, ids, function(result){
                item.table.tbody = list;
                $scope.updateHandlebarStatus(item);
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                item.table.tbody = list;
                $scope.updateHandlebarStatus(item);
            });

        };

  });
