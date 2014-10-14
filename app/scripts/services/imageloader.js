'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Imageloader
 * @description
 * # Imageloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Imageloader', function Imageloader($q, $route, Image) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            'success': 1,
            'message': 'Get image_and_snapshot successfully',
            'data': {
                'status': 'active',
                'created_at': '2014-06-18T05: 42: 08',
                'name': 'cirros',
                'deleted': false,
                'container_format': 'ovf',
                'min_ram': 0,
                'disk_format': 'qcow2',
                'updated_at': '2014-06-18T05: 42: 09',
                'id': 'd1e64e9c-66b7-4491-aa34-4d0a2da99919',
                'owner': '2230a79a72c74876a6b2722ce2982820',
                'protected': false,
                'checksum': '50bdc35edb03a38d91b1b071afb20a3c',
                'min_disk': 0,
                'is_public': true,
                'properties': {  },
                'size': 9761280
            }
        };
        var detailData = {
            title: '',
            basicParams: []
        };
        function setModel(data){

            detailData.id = data.id;
            detailData.title = data.name;
            detailData.basicParams = [
                {
                    key: '名称',
                    val: data.name
                },
                {
                    key: 'ID',
                    val: data.id
                },
                {
                    key: '状态',
                    val: data.status
                },
                {
                    key: '公开的',
                    val: data.is_public ? 'True' : 'False'
                },
                {
                    key: 'Checksum',
                    val: data.checksum
                },
                {
                    key: '创建于',
                    val: data.created_at
                },
                {
                    key: '编辑于',
                    val: data.updated_at
                },
                {
                    key: '大小',
                    val: (data.size/1024/1024).toFixed(2) + 'M'
                },
                {
                    key: '容器格式',
                    val: data.container_format
                },
                {
                    key: '磁盘格式',
                    val: data.disk_format
                }
            ];
        }
        return function(){
            var delay = $q.defer();
            Image.get({id: $route.current.params.id}, function(result){
                setModel(result.data);
                delay.resolve(detailData);
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                setModel(mock.data);
                delay.resolve(detailData);//测试用
                delay.reject('unable to fetch image ' + $route.current.params.id)
            });
            return delay.promise;
        }
  });
