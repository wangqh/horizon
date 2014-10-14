'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Instancedetailloader
 * @description
 * # Instancedetailloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Instancedetailloader', function Instancedetailloader($q, $route, Instance) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
                "message": "Get instance successfully!",
                "data": {
                    "status": "RUNNING",
                    "created_at": "2014-06-19T06:00:37Z",
                    "console_url": "http://192.168.74.129:6080/vnc_auto.html?token=7aa098fa-8915-4948-9857-cc033a65cf2b&title=instance01(0fe5cdb4-9708-4943-9a8d-9eae9a3ee038)",
                    "name": "instance01",
                    "key_name": null,
                    "image": "d1e64e9c-66b7-4491-aa34-4d0a2da99919",
                    "public_ip": [
                        "192.168.74.6"
                    ],
                    "task_state": null,
                    "type": {
                        "vcpus": 1,
                        "ram": 2048,
                        "name": "m1.small"
                    },
                    "id": "0fe5cdb4-9708-4943-9a8d-9eae9a3ee038",
                    "network": [
                        {
                            "ip": "10.1.1.11",
                            "name": "demo_net"
                        }
                    ]
                },
                "success": 1
            };
        var detailData = {};

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
                    key: '创建于',
                    val:  data.created_at
                }
            ];
            detailData.settings = [
                {
                    key: '类型',
                    val: data.type.vcpus + '核' + (data.type.ram > 1024 ? data.type.ram/1024 + 'G' : data.type.ram + 'M')
                },
                {
                    key: '映像 ID',
                    val: data.image
                },
                {
                    key: 'CPU 数量',
                    val: data.type.vcpus
                },
                {
                    key: '内存',
                    val:  data.type.ram > 1024 ? data.type.ram/1024 + 'G' : data.type.ram + 'M'
                },
                {
                    key: 'SSH密钥',
                    val:  data.key_name
                }
            ];

        }

        return function(){
            var delay = $q.defer();
            Instance.get({id: $route.current.params.id}, function(result){
                setModel(result.data);

                delay.resolve(detailData);
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                setModel(mock.data);

                delay.resolve(detailData);//测试用
                delay.reject('unable to fetch router ' + $route.current.params.id)
            });
            return delay.promise;
        }
  });
