'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:RoutersCtrl
 * @description
 * # RoutersCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('RoutersCtrl', function ($scope, $modal, $log, $timeout, Router, Paginator, Filterservice) {

        $scope.pageTitle = '路由器';
        var mock = {
            "message": "路由器列表加载失败！显示的列表均是假数据...",
            "data": [
                {
                    "status": "ACTIVE",
                    "external_gateway_info": {
                        "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                        "network": "external_net1"
                    },
                    "name": "demo_router1",
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "routes": [],
                    "id": "934bcffb-9028-4cde-9c86-819c80bba326"
                },
                {
                    "status": "ACTIVE",
                    "external_gateway_info": {
                        "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                        "network": "external_net1"
                    },
                    "name": "demo_router2",
                    "admin_state_up": false,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "routes": [],
                    "id": "934bcffb-9028-4cde-9c86-819c80bba326"
                },
                {
                    "status": "ACTIVE",
                    "external_gateway_info": {
                        "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                        "network": "external_net1"
                    },
                    "name": "demo_router3",
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "routes": [],
                    "id": "934bcffb-9028-4cde-9c86-819c80bba326"
                },
                {
                    "status": "ACTIVE",
                    "external_gateway_info": {
                        "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                        "network": "external_net1"
                    },
                    "name": "demo_router4",
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "routes": [],
                    "id": "934bcffb-9028-4cde-9c86-819c80bba326"
                },
                {
                    "status": "ACTIVE",
                    "external_gateway_info": {
                        "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                        "network": "external_net1"
                    },
                    "name": "demo_router5",
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "routes": [],
                    "id": "934bcffb-9028-4cde-9c86-819c80bba326"
                },
                {
                    "status": "ACTIVE",
                    "external_gateway_info": {
                        "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                        "network": "external_net1"
                    },
                    "name": "demo_router6",
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "routes": [],
                    "id": "934bcffb-9028-4cde-9c86-819c80bba326"
                }
            ],
            "success": 0,
            count: 6
        };

        $scope.filterService = Filterservice;
        $scope.filterService.searchText = '';
        $scope.page = {
            size: 5 // 每页条数 默认值
        };

        var fetchFn = function(offset, limit, callback){
            var query = $scope.filterService.searchText === '' ? null : $scope.filterService.searchText;

            $scope.currentPageNum = Math.ceil(offset / (limit-1)) + 1;

            Router.get({query: query, offset: offset, limit: limit }, function(result){
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
                //$scope.addTip(mock.success ? 'success' : 'danger', mock.message);
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
                    formGroup: function (Routercreateloader) {
                        return Routercreateloader($scope);
                    },
                    title: function(){
                        return $scope.pageTitle;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                //$log.log(formData);
                Router.save({id: 'create'}, formData, function(result){
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
            if($scope.notSigleChecked)
                return ;
            var item;
            angular.forEach($scope.searchPaginator.currentPageItems, function (value) {
                if(value.checked){
                    item = value;
                }
            });
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
                Router.save({id: item.id}, formData, function(result){
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
            Router.save({id: 'delete'}, ids, function(result){
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
