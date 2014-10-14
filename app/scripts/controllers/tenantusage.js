'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:TenantusageCtrl
 * @description
 * # TenantusageCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
  .controller('TenantusageCtrl', function ($scope, data) {

        var cpuUsed = parseFloat(data.cpu.usage/data.cpu.total*100, 2);
        var diskUsed = parseFloat(data.disk.usage/data.disk.total*100, 2);
        var ramUsed = parseFloat(data.ram.usage/data.ram.total*100, 2);

        $scope.cpuChart = setChartData('CPU 使用量', 'CPU',  [
            ['已使用', cpuUsed],
            ['未使用', 100-cpuUsed]
        ]);


        $scope.diskChart = setChartData('硬盘使用量', '硬盘',  [
            ['已使用', diskUsed],
            ['未使用', 100-diskUsed]
        ]);

        $scope.ramChart = setChartData('内存使用量', '内存',  [
            ['已使用', ramUsed],
            ['未使用', 100-ramUsed]
        ]);

        function setChartData(title ,name, data){
            var chartData = {
                lang:{
                    exportButtonTitle: '导出',
                    printButtonTitle: '打印',
                    downloadJPEG:"下载JPEG 图片",
                    downloadPDF: "下载PDF文档",
                    downloadPNG: "下载PNG 图片",
                    downloadSVG: "下载SVG 矢量图"
                },
                credits: {
                    text: '',
                    href: '#'
                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                title: {
                    text: title,
                    style: {
                        'font-family': '"Microsoft Yahei", Verdana, sans-serif'
                    }
                },
                series: [{
                    type: 'pie',
                    name: name,
                    data: data
                }]
            };
            return chartData;
        }


  });
