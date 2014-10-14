'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:VxnetsCtrl
 * @description
 * # VxnetsCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('VxnetsCtrl', function ($scope, $modal, $log, $timeout, Vxnet, Paginator, Filterservice) {

        $scope.pageTitle = '私有网络';
        var mock = {
            "message": "Get networks fail!",
            "data": [
                {
                    "status": "ACTIVE",
                    "subnets": [],
                    "name": "LuoBang",
                    "provider:physical_network": null,
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "provider:network_type": "gre",
                    "router:external": false,
                    "shared": true,
                    "id": "af82b8b3-f05f-4aa7-918c-5d356a7dcbfa",
                    "provider:segmentation_id": 3
                },
                {
                    "status": "ACTIVE",
                    "subnets": [
                        {
                            "name": "demo_subnet1",
                            "enable_dhcp": true,
                            "network_id": "be79dc12-ef01-4fcc-99d5-cb1c1663a20b",
                            "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                            "dns_nameservers": [],
                            "allocation_pools": [
                                {
                                    "start": "10.1.1.2",
                                    "end": "10.1.1.254"
                                }
                            ],
                            "host_routes": [],
                            "ip_version": 4,
                            "gateway_ip": "10.1.1.1",
                            "cidr": "10.1.1.0/24",
                            "id": "584831d4-a563-440a-911a-5e0286d19c39"
                        }
                    ],
                    "name": "demo_net1",
                    "provider:physical_network": null,
                    "admin_state_up": true,
                    "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                    "provider:network_type": "gre",
                    "router:external": false,
                    "shared": false,
                    "id": "be79dc12-ef01-4fcc-99d5-cb1c1663a20b",
                    "provider:segmentation_id": 2
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

            Vxnet.get({query: query, offset: offset, limit: limit }, function(result){
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
                    formGroup: function (Vxnetcreateloader) {
                        return Vxnetcreateloader();
                    },
                    title: function(){
                        return $scope.pageTitle;
                    }
                }
            });

            modalInstance.result.then(function (formData) {
                //$log.log(formData);
                Vxnet.save({op: 'create'}, formData, function(result){
                    $scope.fetchList();
                    $scope.addTip(result.success ? 'success' : 'danger', result.message);
                },function(){

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
                Vxnet.save({id: item.id, op: 'update'}, formData, function(result){
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
            Vxnet.save({id: 'delete'}, ids, function(result){
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
