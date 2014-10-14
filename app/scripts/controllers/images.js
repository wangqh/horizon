'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ImagesCtrl
 * @description
 * # ImagesCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('ImagesCtrl', function ($scope, $routeParams, Image, $modal, $log, Filterservice, Paginator, user) {
        $scope.pageTitle = '映像';
        $scope.type = $routeParams.op;
        $scope.filterService = Filterservice;
        $scope.filterService.searchText = '';
        $scope.page = {
            size: 5 // 每页条数 默认值
        };

        var mock = {
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
                }
            ],
            count: 6
        };

        switch ($scope.type) {
            case 'system':
                $scope.intro = '系统映像为官方提供的模板。QingCloud 会提供主流的Linux、Windows 模板，并根据上游厂商更新版本时及时制作新模板。';
                $scope.toolbar = {
                    hasRefresh: true,
                    hasCreate: user.isAdmin,
                    handlebar: user.isAdmin ? {
                        isCheckAll: false,
                        hasDelete: true,
                        hasChange: true
                    } : null
                };
                break;
            case 'self':
                $scope.intro = '自有映像为用户自己创建的模板。用户可以将自己名下的主机制作成模板，也可以通过主机的备份导出新模板。同时用户可以将模板共享给主帐户或者其他子帐户。';
                $scope.toolbar = {
                    hasRefresh: true,
                    hasCreate: false,
                    handleDisabled: true,
                    handlebar: {
                        isCheckAll: false,
                        hasDelete: true,
                        hasChange: true
                    }
                };
                break;
        }


        var fetchFn = function(offset, limit, callback){
            var query = $scope.filterService.searchText === '' ? null : $scope.filterService.searchText;

            $scope.currentPageNum = Math.ceil(offset / (limit-1)) + 1;

            Image.get({op: $scope.type, query: query, offset: offset, limit: limit }, function(result){
                $scope.totalCount = result.count;//列表总数
                callback(result.data);
                $scope.isNull = !$scope.searchPaginator.currentPageItems.length;
                $scope.isLoading = false;
                $scope.totalPageNum = Math.ceil($scope.totalCount/(limit-1));
                $scope.hasPaginator = $scope.totalPageNum > 1;
                $scope.checkAll();
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                $scope.totalCount = mock.count;
                callback(mock.data.slice(offset, offset + limit));
                $scope.isNull = !$scope.searchPaginator.currentPageItems.length;
                $scope.isLoading = false;
                $scope.totalPageNum = Math.ceil($scope.totalCount/(limit-1));
                $scope.hasPaginator = $scope.totalPageNum > 1;
                $scope.checkAll();
            });
        };

        $scope.checkAll = function(){
            if($scope.toolbar.handlebar){
                angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                    value.checked = $scope.toolbar.handlebar.isCheckAll;
                });
                $scope.updateHandlebarStatus();
            }
        };

        $scope.fetchList = function(){
            $scope.searchPaginator = Paginator(fetchFn, parseInt($scope.page.size));
            $scope.toolbar.handlebar && ($scope.toolbar.handlebar.isCheckAll = false);
            $scope.isLoading = true;
        };
        $scope.fetchList();

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
                templateUrl: '/views/modalCreateItemForm.html',
                controller: 'ModalcreateitemformCtrl',
                size: null,
                resolve: {
                    formModel: function (Imagecreateloader) {
                        return Imagecreateloader();
                    },
                    title: function(){
                        return '创建' + $scope.pageTitle;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                //$log.log(formData);
                Image.save({id: 'create'}, formData, function(result){
                    $scope.fetchList();
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                },function(){
                    $scope.searchPaginator.currentPageItems.unshift({
                        id: 'fewfe2332232',
                        name: formData.name,
                        status: 'Active',
                        "external_gateway_info": {
                            "network_id": formData.network_id,
                            "network": "external_net2"
                        }
                    });
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.changeItem = function(){
            if($scope.toolbar.notSigleChecked)
                return ;
            var item;
            angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                if(value.checked){
                    item = value;
                }
            });
            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function () {
                        return [
                            {
                                title: '名称',
                                key: 'name',
                                val: item.name,
                                type: 'text',
                                required: true,
                                autofocus: true
                            },
                            {
                                title: '是否公开',
                                key: 'is_public',
                                val: item.is_public,
                                type: 'checkbox',
                                required: false
                            }
                        ];
                    },
                    title: function(){
                        return $scope.pageTitle;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                Image.save({op: item.id, id: 'update'}, formData, function(result){
                    formData.is_public = formData.is_public ? 'True': 'False';
                    angular.extend(item, formData);
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                }, function(){
                    formData.is_public = formData.is_public ? 'True': 'False';
                    angular.extend(item, formData);
                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.removeItems = function(){
            if($scope.toolbar.handleDisabled)
                return ;

            var ids = [];
            angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                if(value.checked){
                    ids.push(value.id);
                }
            });
            Image.save({op: 'delete'}, ids, function(result){
                $scope.fetchList();
                $scope.updateHandlebarStatus();
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                angular.forEach(mock.data, function (value, key) {
                    if(value.checked){
                        mock.data.splice(key,1);
                        mock.count--;
                    }
                });
                $scope.fetchList();
                $scope.updateHandlebarStatus();
            });

        };
  });
