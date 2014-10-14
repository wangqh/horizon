'use strict';

/**
 * @ngdoc service
 * @name horizonApp.vxnetcreateloader
 * @description
 * # vxnetcreateloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Vxnetcreateloader', function Vxnetcreateloader($q, Vxnet) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            "message": "Get data for network creating successfully!",
            "data": [
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
            ],
            "success": 1
        };

        var formGroup = {
            steps: [],
            wizard: {
                step: 1,
                next: function(){
                    var self = this;
                    self.step++;
                },
                prev: function(){
                    var self = this;
                    self.step--;
                }
            }
        };

        var listTenant = [];

        function setModel(){

            formGroup.wizard.step = 1;

            formGroup.steps = [
                {
                    title: '基本信息',
                    formGroup: [
                        {
                            title: '名称',
                            key: 'net_name',
                            val:'',
                            type: 'text',
                            required: true,
                            autofocus: true
                        },
                        {
                            title: '租户',
                            key: 'tenant_id',
                            val: '',
                            type: 'select',
                            options: listTenant,
                            required: false
                        },
                        {
                            title: '管理员状态',
                            key: 'admin_state',
                            val: false,
                            type: 'checkbox',
                            required: false
                        },
                        {
                            title: '共享',
                            key: 'shared',
                            val: false,
                            type: 'checkbox',
                            required: false
                        },
                        {
                            title: '外部网络',
                            key: 'external',
                            val: false,
                            type: 'checkbox',
                            required: false
                        }
                    ]
                },
                {
                    title: '设置子网',
                    formGroup: [
                        {
                            title: '子网名称',
                            key: 'subnet_name',
                            val: '',
                            type: 'text',
                            required: true
                        },
                        {
                            title: '网络地址',
                            key: 'cidr',
                            val: '',
                            type: 'text',
                            required: false
                        },
                        {
                            title: 'IP版本',
                            key: 'ip_version',
                            val: '',
                            type: 'select',
                            options: [
                                {
                                    name: 'IPv4',
                                    value: '4'
                                },
                                {
                                    name: 'IPv6',
                                    value: '6'
                                }
                            ],
                            required: false
                        },
                        {
                            title: '网关IP（可选的）',
                            key: 'gateway_ip',
                            val: '',
                            type: 'text',
                            required: false
                        },
                        {
                            title: 'Disable Gateway',
                            key: 'no_gateway',
                            val: false,
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
                            val: false,
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
                            val: '',
                            type: 'textarea',
                            required: false
                        },
                        {
                            title: 'Host Routes',
                            key: 'host_routes',
                            val: '',
                            type: 'textarea',
                            required: false
                        }
                    ]
                }
            ];
        }



        return function($scope){

            var delay = $q.defer();

            Vxnet.get({op: 'create'}, function(result){
                listTenant = result.data;
                setModel();
                delay.resolve(formGroup);
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                listTenant = mock.data;
                setModel();
                delay.resolve(formGroup);
                //delay.reject('unable to fetch router ')
            });
            return delay.promise;
        }
  });
