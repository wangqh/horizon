'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Interfacedetailloader
 * @description
 * # Interfacedetailloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Interfacedetailloader', function Interfacedetailloader($q, $route, Port) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            "message": "Get port info successfully!",
            "data": {
                "status": "DOWN",
                "name": "",
                "admin_state_up": true,
                "network_id": "efb8ac42-0870-43b5-960c-f21bf0552e16",
                "tenant_id": "",
                "binding:vif_type": "ovs",
                "device_owner": "network:floatingip",
                "binding:capabilities": {
                    "port_filter": false
                },
                "mac_address": "fa:16:3e:91:7e:8b",
                "fixed_ips": [
                    {
                        "subnet_id": "84f7f6d7-d3e6-44b0-b129-d94ead323595",
                        "ip_address": "192.168.74.4"
                    }
                ],
                "id": "349e9520-a0c7-4dd4-bb6a-abf890068fe1",
                "device_id": "7cf0e301-a9d7-4f94-a105-a1378fb5cd01"
            },
            "success": 0
        };
        var detailData = {
            title: '',
            basicParams: []
        };
        function setModel(data){
            var ips = [];

            angular.forEach(data.fixed_ips, function (value, key) {
                ips.push('IP address ('+ value.ip_address + '), 子网 ID (' + value.subnet_id + ')');
            });


            data.name = data.name ? data.name : data.id.split('-')[0];

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
                    key: '网络ID',
                    val: data.network_id
                },
                {
                    key: '项目ID',
                    val: data.tenant_id
                },
                {
                    type: 'array',
                    key: '内部IP',
                    val: ips
                },
                {
                    key: 'Mac地址',
                    val: data.mac_address
                },
                {
                    key: '状态',
                    val: data.status
                },
                {
                    key: '管理员状态',
                    val: data.admin_state_up ? 'UP' : ''
                },
                {
                    key: '设备拥有者',
                    val: data.device_owner
                },
                {
                    key: '设备ID',
                    val: data.device_id
                }
            ];
        }

        return function(){
            var delay = $q.defer();
            Port.get({id: $route.current.params.id}, function(result){
                setModel(result.data);
                delay.resolve(detailData);
                $scope.addTip(result.success ? 'success' : 'danger', result.message);
            }, function(){
                setModel(mock.data);
                delay.resolve(detailData);//测试用
                delay.reject('unable to fetch interface ' + $route.current.params.id)
            });
            return delay.promise;
        }
  });
