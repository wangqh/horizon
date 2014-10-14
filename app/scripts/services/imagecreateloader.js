'use strict';

/**
 * @ngdoc service
 * @name horizonApp.imagecreateloader
 * @description
 * # imagecreateloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Imagecreateloader', function Imagecreateloader($q, Image) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            'success': 1,
            'message': 'Get disk_format successfully',
            'data': [{'name': 'AKI - Amazon Kernel Image', 'id': 'aki'},
                {'name': 'AMI - Amazon Machine Image', 'id': 'ami'}
                ]
        };

        var formModel = {
          attrs: {
              action: '/horizon/admin/images/create/',
              method: 'post',
              enctype: 'multipart/form-data'
          }
        };

        function setModel(data){
            formModel.formGroup = [
                {
                    title: '名称',
                    key: 'name',
                    val:'',
                    type: 'text',
                    required: true,
                    autofocus: true
                },
                {
                    title: '本地映像',
                    key: 'copy_from',
                    val:'',
                    type: 'text',
                    placeholder: 'http://example.com/image.iso',
                    required: false
                },
                {
                    title: '映像文件',
                    key: 'image_file',
                    val:'',
                    type: 'file',
                    required: true
                },
                {
                    title: '映像格式',
                    key: 'disk_format',
                    val:'',
                    type: 'select',
                    required: true,
                    options: data
                },
                {
                    title: '最小硬盘',
                    key: 'minimum_disk',
                    val: 0,
                    type: 'number',
                    min: 0,
                    unit: 'GB',
                    required: false
                },
                {
                    title: '最小内存',
                    key: 'minimum_ram',
                    val: 0,
                    type: 'number',
                    min: 0,
                    unit: 'MB',
                    required: false
                },
                {
                    title: '公开的',
                    key: 'is_public',
                    val: false,
                    type: 'checkbox',
                    required: false
                }
            ]
        }

        return function($scope){

            var delay = $q.defer();

            Image.get({op: 'create'}, function(result){
                setModel(result.data);
                delay.resolve(formModel);
                //$scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                setModel(mock.data);
                delay.resolve(formModel);
                //delay.reject('unable to fetch router ')
            });
            return delay.promise;
        }
  });
