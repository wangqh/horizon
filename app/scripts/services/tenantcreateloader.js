'use strict';

/**
 * @ngdoc service
 * @name horizonApp.tenantcreateloader
 * @description
 * # tenantcreateloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Tenantcreateloader', function Tenantcreateloader($q, Tenant) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            "message": "Get tenants info for creating successfully!",
            "data": {
                "users": [
                    {
                        "name": "cinder",
                        "id": "22f9053a72394ac092572a369a6f0a98"
                    },
                    {
                        "name": "test",
                        "id": "39b4d42898c64f58b2f0ae6300d700be"
                    },
                    {
                        "name": "quantum",
                        "id": "3e05df8bfdb2461e8e12d6390d369737"
                    },
                    {
                        "name": "demo",
                        "id": "5cf2bdb2466e47898cc73e16a9675501"
                    },
                    {
                        "name": "glance",
                        "id": "80d7b2ecd6b5413eaff66fd18ac40d38"
                    },
                    {
                        "name": "nova",
                        "id": "897f8bdf6f934b87b1d28bd84e51e370"
                    },
                    {
                        "name": "admin",
                        "id": "a88cd02681684f43a5a4fe5d131a23ce"
                    },
                    {
                        "name": "swift",
                        "id": "c2bec59ab88b48ac871b8a47bc2e8642"
                    }
                ],
                "quota": {
                    "metadata_items": 128,
                    "injected_file_content_bytes": 10240,
                    "volumes": 10,
                    "gigabytes": 1000,
                    "ram": 51200,
                    "floating_ips": 10,
                    "security_group_rules": 20,
                    "instances": 10,
                    "injected_files": 5,
                    "cores": 20,
                    "fixed_ips": -1,
                    "security_groups": 10
                }
            },
            "success": 1
        };

        var mockUpdate = {
            "message": "Update tenant info successfully!",
            "data": {
                "users": [
                    {
                        "name": "demo",
                        "id": "5cf2bdb2466e47898cc73e16a9675501",
                        checked: true
                    },
                    {
                        "name": "cinder",
                        "id": "22f9053a72394ac092572a369a6f0a98"
                    },
                    {
                        "name": "test",
                        "id": "39b4d42898c64f58b2f0ae6300d700be"
                    },
                    {
                        "name": "quantum",
                        "id": "3e05df8bfdb2461e8e12d6390d369737"
                    },
                    {
                        "name": "glance",
                        "id": "80d7b2ecd6b5413eaff66fd18ac40d38"
                    },
                    {
                        "name": "nova",
                        "id": "897f8bdf6f934b87b1d28bd84e51e370"
                    },
                    {
                        "name": "admin",
                        "id": "a88cd02681684f43a5a4fe5d131a23ce"
                    },
                    {
                        "name": "swift",
                        "id": "c2bec59ab88b48ac871b8a47bc2e8642"
                    }
                ],
                "name": "invisible_to_admin",
                "enabled": true,
                "quota": {
                    "metadata_items": 128,
                    "injected_file_content_bytes": 10240,
                    "volumes": 10,
                    "gigabytes": 1000,
                    "ram": 51200,
                    "floating_ips": 10,
                    "security_group_rules": 20,
                    "instances": 10,
                    "injected_files": 5,
                    "cores": 20,
                    "fixed_ips": -1,
                    "security_groups": 10
                },
                "description": null
            },
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

        function setModel(data){

            formGroup.wizard.step = 1;

            formGroup.steps = [
                {
                    title: '租户信息',
                    formGroup: [
                        {
                            title: '名称',
                            key: 'name',
                            val: data.name,
                            type: 'text',
                            required: true,
                            autofocus: true
                        },
                        {
                            title: '描述',
                            key: 'description',
                            val: data.description,
                            type: 'textarea',
                            required: false
                        },
                        {
                            title: '是否开启',
                            key: 'enabled',
                            val: data.enabled,
                            type: 'checkbox',
                            required: false
                        }
                    ]
                },
                {
                    title: '租户成员',
                    formGroup: {
                        modList: [
                            {
                                title: '所有用户',
                                key: 'users',
                                checkboxList: data.users
                            }
                        ]
                    }
                },
                {
                    title: '配额',
                    formGroup: [
                        {
                            title: '元数据项',
                            key: 'metadata_items',
                            val: data.quota.metadata_items,
                            type: 'text',
                            required: true
                        },
                        {
                            title: 'VCPUs',
                            key: 'cores',
                            val: data.quota.cores,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '云主机列表',
                            key: 'instances',
                            val: data.quota.instances,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '注入文件',
                            key: 'injected_files',
                            val: data.quota.injected_files,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '注入文件大小',
                            key: 'injected_file_content_bytes',
                            val: data.quota.injected_file_content_bytes,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '卷列表',
                            key: 'volumes',
                            val: data.quota.volumes,
                            type: 'text',
                            required: true
                        },
                        {
                            title: 'Gigabytes',
                            key: 'gigabytes',
                            val: data.quota.gigabytes,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '内存(MB)',
                            key: 'ram',
                            val: data.quota.ram,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '公网IP列表',
                            key: 'floating_ips',
                            val: data.quota.floating_ips,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '内网IP列表',
                            key: 'fixed_ips',
                            val: data.quota.fixed_ips,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '安全组列表',
                            key: 'security_groups',
                            val: data.quota.security_groups,
                            type: 'text',
                            required: true
                        },
                        {
                            title: '安装规则列表',
                            key: 'security_group_rules',
                            val: data.quota.security_group_rules,
                            type: 'text',
                            required: true
                        }
                    ]
                }
            ];
        }



        return function(isEdit, id){

            var delay = $q.defer();
            var params = {};

            if(isEdit){
                formGroup.update = true;
                params = {
                    id: id,
                    op: 'update'
                }
            } else {
                formGroup.update = false;
                params = {
                    op: 'create'
                }
            }

            Tenant.get(params, function(result){
                setModel(result.data);
                delay.resolve(formGroup);
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                setModel(isEdit ? mockUpdate.data : mock.data);
                delay.resolve(formGroup);
                //delay.reject('unable to fetch router ')
            });
            return delay.promise;
        }
  });
