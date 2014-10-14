'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModalcreateinstanceCtrl
 * @description
 * # ModalcreateinstanceCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('ModalcreateinstanceCtrl', function ($scope, $modalInstance, Paginator, Image, $timeout, Instance, user, $modal, $log, loaded) {
        loaded = true;
        var mock = {
            "message": "Get data for creating instance successfully!",
            "data": {
                "security_groups": [
                    {
                        name:"cCascas",
                        id: '3243243209543-3r532'
                    },
                    {
                        name: "cxzcxzcxzczx",
                        id: '-23530204324-21-431=-23'
                    },
                    {
                        name: "cxzczx",
                        id: '343215432-54-325=03295'
                    },
                    {
                        name: "default",
                        id: '0932045382054329-532'
                    },
                    {
                        name: "dsad",
                        id: '235432532153214324231'
                    }
                ],
                "keypairs": [
                   // "luojun_keypair"
                ],
                "networks": [
                    {
                        "name": "LuoJun_Net",
                        "id": "1c1578b2-a347-4f74-a605-f23f5e888e96"
                    },
                    {
                        "name": "LuoBangze_Net",
                        "id": "3c06424d-fada-428a-b022-e9b6c682b3bb"
                    },
                    {
                        "name": "demo_net",
                        "id": "be79dc12-ef01-4fcc-99d5-cb1c1663a20b"
                    }
                ],
                "types": [
                    {
                        "vcpus": 1,
                        "ram": 512,
                        "name": "m1.tiny",
                        "id": "1"
                    },
                    {
                        "vcpus": 1,
                        "ram": 2048,
                        "name": "m1.small",
                        "id": "2"
                    },
                    {
                        "vcpus": 2,
                        "ram": 4096,
                        "name": "m1.medium",
                        "id": "3"
                    },
                    {
                        "vcpus": 4,
                        "ram": 8192,
                        "name": "m1.large",
                        "id": "4"
                    },
                    {
                        "vcpus": 8,
                        "ram": 16384,
                        "name": "m1.xlarge",
                        "id": "5"
                    }
                ]
            },
            "success": 1
        };
        var mockImage = {
            'success': 1,
            'message': 'Get images successfully',
            'data': [
                {
                    'status': 'active',
                    'name': 'cirros1',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': true,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros2',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros3',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': true,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros4',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros5',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros6',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros6',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros6',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros6',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                },
                {
                    'status': 'active',
                    'name': 'cirros6',
                    'deleted': false,
                    'container_format': 'ovf',
                    'created_at': '2014-06-18T05: 42: 08',
                    'disk_format': 'qcow2',
                    'updated_at': '2014-06-18T05: 42: 09',
                    'properties': {},
                    'owner': '2230a79a72c74876a6b2722ce2982820',
                    'protected': false,
                    'min_ram': 0,
                    'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                    'min_disk': 0,
                    'is_public': false,
                    'deleted_at': 'None',
                    'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                    'size': 9761280
                }
            ],
            count: 10
        };

        var fetchFn = function(offset, limit, callback){


            $scope.currentPageNum = Math.ceil(offset / (limit-1)) + 1;

            Image.get({op: $scope.image.currentType, offset: offset, limit: limit }, function(result){
                $scope.totalCount = result.count;//列表总数
                callback(result.data);
                setDefaultImage(result.data);
                $scope.image.isNull = !$scope.paginator.currentPageItems.length;
                $scope.image.isLoading = false;
                $scope.totalPageNum = Math.ceil($scope.totalCount/(limit-1));
                $scope.hasPaginator = $scope.totalPageNum > 1;
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                $scope.totalCount = mockImage.count;
                callback(mockImage.data.slice(offset, offset + limit));
                setDefaultImage(mockImage.data);
                $scope.image.isNull = !$scope.paginator.currentPageItems.length;
                $scope.image.isLoading = false;
                $scope.totalPageNum = Math.ceil($scope.totalCount/(limit-1));
                $scope.hasPaginator = $scope.totalPageNum > 1;

            });
        };

        /* 设置默认映像 */
        function setDefaultImage(data){
            angular.forEach(data, function (value, key) {
                if(key == 0){
                    value.selected = true;
                    $scope.currentImage = value;
                } else {
                    value.selected = false;
                }
            });
        }

        var selectImage = function(item){
            if ($scope.currentImage)
                $scope.currentImage.selected = 0;

            item.selected = 1;

            $scope.currentImage = item;
        };

        $scope.selectType = function(item){
            if ($scope.currentType)
                $scope.currentType.selected = 0;

            item.selected = 1;

            $scope.currentType = item;
        };

        $scope.checkbox = function(item){
            item.checked = !item.checked;
        };

        $scope.radio = function(list, item){
            angular.forEach(list, function (value, key) {
                value.checked = false;
            });
            item.checked = true;
        };

        $scope.isLoading = true;

        Instance.get({op: 'launch'}, function(result){
            successLoadInstances(result.data);
            $scope.addTip(result.success ? 'success' : 'danger', result.message);
        },function(){
            successLoadInstances(mock.data);
        });

        $scope.ssh = {};
        $scope.user = user;

        function successLoadInstances(data){
            $scope.data = data;
            $scope.isLoading = false;
            $scope.currentType = data.types[0];
            $scope.currentType.selected = true;
            $scope.keypair = data.keypairs.length && data.keypairs[0];
            $scope.ssh.password = '';
        }

        $scope.createSSH = function(){
            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function () {
                        var formGroup =  [
                            {
                                title: '名称',
                                key: 'key_name',
                                val:'',
                                type: 'text',
                                required: true,
                                autofocus: true
                            },
                            {
                                title: '方式',
                                key: '',
                                val:'system',
                                type: 'radio',
                                list: [
                                    {
                                        label: '创建新密钥对',
                                        value: 'system'
                                    },
                                    {
                                        label: '使用已有公钥',
                                        value: 'user',
                                        showMod: 'public_key'
                                    }
                                ],
                                required: true
                            },
                            {
                                removed: true,
                                title: '公钥',
                                key: 'public_key',
                                val:'',
                                type: 'textarea',
                                rows: 10,
                                describe: '格式：ssh-rsa AAAAB3NzaC1ycEAAArwtrqwerJAsdfdgjUTEEHh...',
                                required: true
                            }
                        ];
                        return formGroup;
                    },
                    title: function(){
                        return 'SSH密钥';
                    }
                }
            });

            modalInstance.result.then(function (formData) {

                Instance.save({op: formData.public_key ? 'import_keypair' : 'create_keypair'}, formData, function(result){
                     $scope.addTip(result.success ? 'success' : 'danger', result.message);
                    $scope.data.keypairs.push(result.data.key_name);
                    $scope.keypair = result.data.key_name;
                    openModalDownloadKeypair(result.data.key_name);
                 }, function(){
                    $scope.data.keypairs.push(formData.key_name);
                    $scope.keypair = formData.key_name;
                    openModalDownloadKeypair(formData.key_name);
                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function openModalDownloadKeypair(key_name){
            var modalInstance = $modal.open({
                templateUrl: '/views/modalDownloadKeypair.html',
                controller: 'ModaldownloadkeypairCtrl',
                backdrop: 'static',
                size: null,
                resolve: {
                    data: function () {
                        return {
                            key_name: key_name,
                            tips: '通过点击“下载”按钮，可以取得私钥，此下载链接将保留10分钟。'
                        };
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.image = {
            isLoading: true,
            isNull: false,
            currentType: 'system',
            select: selectImage
        };

        $scope.wizard = {
            step: 1,
            next: function(){
                var self = this;
                self.step++;
            },
            prev: function(){
                var self = this;
                self.step--;
            }
        };

        $scope.paginator = Paginator(fetchFn, 8);

        $scope.formData = {
            name: '',
            network_ids: [],
            security_groups: [],
            image_id: '',
            flavor_id: '',
            ssh: {
                type: 'keypair'
            },
            count: 1,
            create_public_ip: false
        };


        $scope.fetchImages = function(type){
            $scope.image.currentType = type;
            $scope.paginator = Paginator(fetchFn, 8);
        };

        $scope.submit = function(){

            $scope.formData.image_id = $scope.currentImage.id;
            $scope.formData.flavor_id = $scope.currentType.id;
            angular.forEach($scope.data.networks, function (value, key) {
                if(value.checked){
                    $scope.formData.network_ids.push(value.id);
                }
            });
            angular.forEach($scope.data.security_groups, function (value, key) {
                if(value.checked){
                    $scope.formData.security_groups.push(value.name);
                }
            });
            if($scope.formData.ssh.type == 'keypair'){
                $scope.formData.ssh.value =  $scope.keypair;
            } else if($scope.formData.ssh.type == 'password'){
                $scope.formData.ssh.value = $scope.ssh.password;
            }

            $modalInstance.close($scope.formData);
        };

        $scope.dismiss = function(){
            $modalInstance.dismiss('close');
        }
  });
