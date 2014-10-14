'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:InstancedetailCtrl
 * @description
 * # InstancedetailCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('InstancedetailCtrl', function ($scope, detail) {
        $scope.detail = detail;
        $scope.parent = {
            path: '/horizon/instances/',
            title: '主机'
        };
        $scope.detail.monitor = {
            rangeList: [
                {
                    text: '最近6小时',
                    value: 6
                },
                {
                    text: '最近一天',
                    value: 24
                },
                {
                    text: '最近两周',
                    value: 336
                },
                {
                    text: '最近一个月',
                    value: 772
                },
                {
                    text: '最近6个月',
                    value: 4632
                }
            ],
            range: 6,
            toggle: {
                cpu: false,
                ram: false,
                iops: false,
                mpps: false,
                vxnet: false
            }
        }
  });
