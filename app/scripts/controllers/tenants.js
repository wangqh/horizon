'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:TenantsCtrl
 * @description
 * # TenantsCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('TenantsCtrl', function ($scope, $modal, $log, $timeout, Tenant, Paginator, Filterservice, Modalconfirm) {

        $scope.pageTitle = '租户';
        var mock = {
            "message": "Get networks fail!",
            "data": [
                {
                    "description": null,
                    "enabled": true,
                    "name": "admin",
                    "id": "2230a79a72c74876a6b2722ce2982820"
                },
                {
                    "description": null,
                    "enabled": false,
                    "name": "service",
                    "id": "575cc9bda2954281872e2b2795588a70"
                },
                {
                    "description": null,
                    "enabled": true,
                    "name": "invisible_to_admin",
                    "id": "b8010d1a87794354857f1110bc15f84b"
                },
                {
                    "description": null,
                    "enabled": true,
                    "name": "test",
                    "id": "bf1ad01deb7f446eb7260a2f45f256c0"
                },
                {
                    "description": null,
                    "enabled": true,
                    "name": "demo",
                    "id": "c9a301e6f6f3472cbf125344699083a9"
                }
            ],
            "success": 0,
            count: 2
        };

        $scope.filterService = Filterservice;
        $scope.filterService.searchText = '';
        $scope.page = {
            size: 5 // 每页条数 默认值
        };

        var fetchFn = function(offset, limit, callback){
            var query = $scope.filterService.searchText === '' ? null : $scope.filterService.searchText;

            $scope.currentPageNum = Math.ceil(offset / (limit-1)) + 1;

            Tenant.get({query: query, offset: offset, limit: limit }, function(result){
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

        $scope.fetchList = function(){
            $scope.searchPaginator = Paginator(fetchFn, parseInt($scope.page.size));
            $scope.isCheckAll = false;
            $scope.isLoading = true;
        };
        $scope.fetchList();


        $scope.handleDisabled = true;

        $scope.checkAll = function(){
            angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                value.checked = $scope.isCheckAll;
            });
            $scope.updateHandlebarStatus();
        };

        $scope.updateHandlebarStatus = function(){
            var count = 0;
            angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                count = value.checked ? count+1 : count;
            });
            $scope.handleDisabled = !count;
            $scope.notSigleChecked = count !== 1;
        };

        $scope.createItem = function() {

            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function (Tenantcreateloader) {
                        return Tenantcreateloader();
                    },
                    title: function(){
                        return $scope.pageTitle;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                //$log.log(formData);
                Tenant.save({op: 'create'}, formData, function(result){
                    $scope.fetchList();
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                },function(){

                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.edit = function(item){

            var modalInstance = $modal.open({
                templateUrl: '/views/modalCreateItems.html',
                controller: 'ModalcreateitemCtrl',
                size: null,
                resolve: {
                    formGroup: function (Tenantcreateloader) {
                        return Tenantcreateloader(true, item.id);
                    },
                    title: function(){
                        return $scope.pageTitle;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                Tenant.save({id: item.id, op: 'update'}, formData, function(result){
                    angular.extend(item, formData);
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                }, function(){
                    angular.extend(item, formData);
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.removeItems = function(){
            if($scope.handleDisabled)
                return ;
            var ids = [];
            angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                if(value.checked){
                    ids.push(value.id);
                }
            });

            Modalconfirm({
                size: 'sm',
                type: 'info',
                msg: '确定要删除租户[' + ids.join(' 和 ') + '] ?',
                callback: deleteItems
            });

            function deleteItems(){
                Tenant.save({id: 'delete'}, ids, function(result){
                    $scope.fetchList();
                    $scope.updateHandlebarStatus();
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                }, function(){

                });
            }

        };
  });
