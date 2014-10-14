'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:InstancesCtrl
 * @description
 * # InstancesCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('InstancesCtrl', function ($scope, $routeParams, Instance, $modal, $log, Filterservice, Paginator, $filter, $timeout, $interval,  Modalconfirm, $q, Modalloading) {

        $scope.pageTitle = '主机';
        //$scope.type = $routeParams.op;
        $scope.filterService = Filterservice;

        $scope.page = {
            size: 5 // 每页条数 默认值
        };


        $scope.filterResult = [];

        var mock = {
            "count": 3,
            "message": "Get instances successfully!",
            "data": [
                {
                    "status": "RUNNING",
                    "created_at": "2014-08-12T06:24:42Z",
                    "console_url": "http://192.168.74.129:6080/vnc_auto.html?token=0357e5ad-bcb9-41e4-9781-08ee4074c8ef&title=Test1(bdc00568-c701-44c1-a6b2-02add4efddbe)",
                    "name": "Test1",
                    "key_name": null,
                    "image": "cirros",
                    "public_ip": [
                        "192.168.74.13"
                    ],
                    "host": "Ubuntu",
                    "time": "14小时前",
                    "task_state": null,
                    "type": {
                        "vcpus": 1,
                        "ram": 512,
                        "name": "m1.tiny"
                    },
                    "id": "bdc00568-c701-44c1-a6b2-02add4efddbe",
                    "tenant": "demo",
                    "network": [
                        {
                            "ip": "192.168.79.3",
                            "name": "Test"
                        }
                    ]
                },
                {
                    "status": "RUNNING",
                    "created_at": "2014-08-12T06:20:03Z",
                    "console_url": "http://192.168.74.129:6080/vnc_auto.html?token=38a2f592-3fe1-4f70-82ad-239ac40ddcc5&title=fsdff(cae75874-fa38-44f3-a83c-edaad70a25db)",
                    "name": "fsdff",
                    "key_name": null,
                    "image": "cirros",
                    "public_ip": [
                        "192.168.74.14"
                    ],
                    "host": "Ubuntu",
                    "time": "14小时前",
                    "task_state": null,
                    "type": {
                        "vcpus": 1,
                        "ram": 512,
                        "name": "m1.tiny"
                    },
                    "id": "cae75874-fa38-44f3-a83c-edaad70a25db",
                    "tenant": "demo",
                    "network": [
                        {
                            "ip": "192.168.10.3",
                            "name": "LuoJun_Net"
                        }
                    ]
                },
                {
                    "status": "RUNNING",
                    "created_at": "2014-08-11T07:21:40Z",
                    "console_url": "http://192.168.74.129:6080/vnc_auto.html?token=e498fed0-a183-43b8-a350-876b8ead7349&title=Test(de042dc9-36f7-4da4-9a58-d91be3de163c)",
                    "name": "Test",
                    "key_name": null,
                    "image": "cirros",
                    "public_ip": [],
                    "host": "Ubuntu",
                    "time": "1天前",
                    "task_state": null,
                    "type": {
                        "vcpus": 1,
                        "ram": 512,
                        "name": "m1.tiny"
                    },
                    "id": "de042dc9-36f7-4da4-9a58-d91be3de163c",
                    "tenant": "demo",
                    "network": [
                        {
                            "ip": "192.168.10.5",
                            "name": "LuoJun_Net"
                        }
                    ]
                }
            ],
            "success": 1
        };

        var item;


        $scope.toolbar = {
            hasRefresh: true,
            hasCreate: true,
            handleDisabled: true,
            handlebar: {
                isCheckAll: false
            }
        };

        var interval = $interval(fetchStatus, 5000);

        function fetchStatus(){

            var ids = [];
            var _filterResult = $scope.filterResult;

            angular.forEach(_filterResult, function (value) {
                ids.push(value.id);
            });

            Instance.save({op: 'flush'}, ids, function(result){
                angular.forEach(result.data, function (value, key) {
                    angular.forEach(_filterResult, function (value2) {
                        if (value.id == value2.id) {
                            value2.status = value.status;
                            value2.public_ip = value.public_ip;
                        }
                    });
                });
            });
        };

        $scope.$on('$destroy', function(){
            $interval.cancel(interval);
        });


        var fetchFn = function(offset, limit, callback){
            var query = $scope.filterService.searchText === '' ? null : $scope.filterService.searchText;

            $scope.currentPageNum = Math.ceil(offset / (limit-1)) + 1;

            Instance.get({op: $scope.type, query: query, offset: offset, limit: limit }, function(result){
                $scope.totalCount = result.count;//列表总数
                callback(result.data);
                $scope.isNull = !$scope.searchPaginator.currentPageItems.length;
                $scope.isLoading = false;
                $scope.totalPageNum = Math.ceil($scope.totalCount/(limit-1));
                $scope.hasPaginator = $scope.totalPageNum > 1;
                $scope.updateHandlebarStatus();
                filterFn();
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                $scope.totalCount = mock.count;
                callback(mock.data.slice(offset, offset + limit));
                $scope.isNull = !$scope.searchPaginator.currentPageItems.length;
                $scope.isLoading = false;
                $scope.totalPageNum = Math.ceil($scope.totalCount/(limit-1));
                $scope.hasPaginator = $scope.totalPageNum > 1;
                $scope.updateHandlebarStatus();
                filterFn();
            });
        };

        $scope.fetchList = function(){
            $scope.searchPaginator = Paginator(fetchFn, parseInt($scope.page.size));
            $scope.toolbar.handlebar && ($scope.toolbar.handlebar.isCheckAll = false);
            $scope.isLoading = true;
        };
        $scope.fetchList();



        $scope.checkAll = function(){
            if($scope.toolbar.handlebar){
                filterFn();
                angular.forEach($scope.filterResult, function (value) {
                    value.checked = $scope.toolbar.handlebar.isCheckAll;
                });
                $scope.updateHandlebarStatus();
            }
        };

        function filterFn(){
            angular.forEach($scope.searchPaginator.currentPageItems, function (value, key) {
                value.checked = false;
            });
            $scope.filterResult = $scope.searchPaginator.currentPageItems;
            $scope.filterResult = $filter('filter')($scope.filterResult, $scope.filterService.searchText);
            $scope.filterResult = $filter('filter')($scope.filterResult, $scope.filterService.activeFilters);
            //callback();
        }

        $scope.filterStatus = function(type){
            $scope.filterService.activeFilters.status = type || '';
            $scope.status.isOpen = false;
            $scope.fetchList();
        };



        $scope.updateHandlebarStatus = function(){
            var count = 0;
            angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                count = value.checked ? count+1 : count;
            });
            $scope.toolbar.handleDisabled = !count;
            $scope.toolbar.notSigleChecked = count !== 1;
        };

        $scope.createItem = function() {



            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateInstance.html',
                controller: 'ModalcreateinstanceCtrl',
                size: 'lg',
                resolve: {
                    user: function(){
                        return $scope.user;
                    }
                }
            });



            modalInstance.result.then(function (formData) {
                //$log.log(formData);
                var item = {
                    "status": "creating",
                    "time": "",
                    "console_url": "",
                    "name": formData.name,
                    "key_name": formData.ssh.type == 'keypair' ? formData.ssh.value : null,
                    "image": formData.image_id,
                    "public_ip": [],
                    "task_state": null,
                    "type": null,
                    "id": null,
                    "network": [ ]
                };
                $scope.filterResult.unshift(item);

                Instance.save({id: 'launch'}, formData, function(result){
                    angular.extend(item, result.data);
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                },function(){
                    $timeout(function(){
                        item.status = 'RUNNING'
                    },2000)
                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });


        };


        /* 开机 */
        $scope.starting = function(item){
            item.isOpen = false;

            if(item.status == 'RUNNING'){
                Modalconfirm({
                    size: 'sm',
                    type: 'danger',
                    msg: '资源[' + item.name + ']不可执行当前操作.'
                });
                return ;
            }
            item.status = 'booting';
            Instance.get({id: item.id, op: 'server_start'}, function(result){
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
                //item.status = 'RUNNING';
            },function(){
                $timeout(function(){
                    item.status = 'RUNNING';
                },2000);
                console.log($scope.filterResult);
            });

        };

        /* 关机 */
        $scope.shutdown = function(item){
            item.isOpen = false;
            item.status = 'stopping';
            Instance.get({id: item.id, op: 'server_stop'}, function(result){
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
                //item.status = 'SHUTDOWN';
            },function(){
                $timeout(function(){
                    item.status = 'SHUTDOWN';
                },2000);
            });
        };

        /* 重启 */
        $scope.restart = function(item){

            item.isOpen = false;


            item.status = 'rebooting';
            Instance.get({id: item.id, op: 'reboot'}, function(result){
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
                //item.status = 'RUNNING';
            },function(){
                $timeout(function(){
                    item.status = 'RUNNING';
                },2000);
            });
        };

        /* 关联公网IP */
        $scope.relateIP = function(item){
            item.isOpen = false;



            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function (Relateiploader) {
                        return Relateiploader(item.id, allocateFlotingIP);
                    },
                    title: function(){
                        return {
                            custom: '关联公网IP'
                        };
                    }
                }
            });

            modalInstance.result.then(function (formData) {

                Instance.save({id: item.id, op: 'associate_floting_ip'}, formData, function(result){
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                    item.public_ip.push(result.public_ip);
                },function(){
                    var mock = {	'success': 1,
                        'message': 'Success: Associated floting ip.',
                        'public_ip': '192.168.74.128'
                    };
                    item.public_ip.push(mock.public_ip);
                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });


            Modalloading(modalInstance);


        };

        /* 分配公网IP */
        function allocateFlotingIP(selectItem){

            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function () {
                        var delay = $q.defer();
                        var formGroup = [
                            {
                                title: '外部网络',
                                key: 'pool_id',
                                val: null,
                                type: 'select',
                                required: true,
                                options: []
                            }
                        ];
                        Instance.get({ op: 'allocate_floting_ip'}, function(result){
                            formGroup[0].options = result.data;
                            delay.resolve(formGroup);
                        },function(){
                            formGroup[0].options = [
                                {
                                    "id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                                    "name": "external_net1"
                                }
                            ];
                            delay.resolve(formGroup);
                        });
                        return delay.promise;
                    },
                    title: function(){
                        return {
                            custom: '分配公网IP'
                        };
                    }
                }
            });

            modalInstance.result.then(function (formData) {

                Instance.save({ op: 'allocate_floting_ip'}, formData, function(result){
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                    selectItem.options.unshift(result.fip);
                    selectItem.val = result.fip.id;
                },function(){
                    var  mock = {
                        "success": 1,
                        "message": "..",
                        "fip": {
                            name: "192.168.74.15",
                            id: 'c78def8c-c9e1-40e9-a8f2-854fddb864c0'
                        }
                    };
                    selectItem.options.unshift(mock.fip);
                    selectItem.val = mock.fip.id;
                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        /* 解除关联公网IP */
        $scope.relieveRelateIP = function(item){
            item.isOpen = false;
            Instance.save({id: item.id, op: 'remove_floting_ip'}, {}, function(result){
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
                item.public_ip = [];
            },function(){});
        };

        /* 制作映像 */
        $scope.createImage = function(item){
            item.isOpen = false;
            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function () {
                        var formRows = [
                            {
                                title: '名称',
                                key: 'name',
                                val:'',
                                type: 'text',
                                required: true,
                                autofocus: true
                            }
                        ];
                        return formRows;
                    },
                    title: function(){
                        return '映像';
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                Instance.save({id: item.id, op: 'create_image'}, formData, function(result){
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                }, function(){});
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /* 更改配置 */
        $scope.setting = function(item){
            item.isOpen = false;
        };

        /* 重命名 */
        $scope.rename = function(item){
            item.isOpen = false;
            var modalInstance = $modal.open({
                templateUrl: '/views/modalChangeItem.html',
                controller: 'ModalchangeitemCtrl',
                size: null,
                resolve: {
                    item: function () {
                        return item;
                    },
                    title: function(){
                        return $scope.pageTitle;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                Instance.save({id: item.id, op: 'rename'}, formData, function(result){
                    item.name = formData.name;
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                }, function(){
                    item.name = formData.name;
                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        /* 修改安全组 */
        $scope.update = function(item){
            item.isOpen = false;
            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function () {
                        var mock = {
                            "message": "Update instance successfully!",
                            "data": [
                                {
                                    "name": "default",
                                    "id": 1
                                },
                                {
                                    "name": "test",
                                    "id": 2
                                }
                            ],
                            "success": 1
                        };
                        var delay = $q.defer();
                        var formGroup = {
                            modList: [
                                {
                                    title: '防火墙',
                                    checkboxList: []
                                }
                            ]
                        };

                        Instance.get({id: item.id, op: 'update'}, function(result){
                            formGroup.modList[0].checkboxList = result.data;
                            delay.resolve(formGroup);
                        },function(){
                            formGroup.modList[0].checkboxList = mock.data;
                            delay.resolve(formGroup);
                        });
                        return delay.promise;
                    },
                    title: function(){
                        return '修改安全组';
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                Instance.save({id: item.id, op: 'update'}, formData, function(result){
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                }, function(){
                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };



        $scope.removeItems = function(){
            if($scope.toolbar.handleDisabled)
                return ;
            $scope.toolbar.handlebar.isOpen = false;

            var ids = [];
            angular.forEach($scope.filterResult, function (value) {
                if(value.checked){
                    ids.push(value.id);
                }
            });

            Modalconfirm({
                size: 'sm',
                type: 'info',
                msg: '确定要删除主机[' + ids.join(' 和 ') + '] ?',
                callback: deleteInstances
            });

            function deleteInstances(){
                Instance.save({op: 'delete'}, ids, function(result){
                    $scope.fetchList();
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                }, function(){
                    angular.forEach(mock.data, function (value, key) {
                        if(value.checked){
                            mock.data.splice(key,1);
                            mock.count--;
                        }
                    });
                    $scope.fetchList();
                });
            }

        };
  });
