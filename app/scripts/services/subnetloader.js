'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Subnetloader
 * @description
 * # Subnetloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Subnetloader', function Subnetloader($q, $route, Subnet) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            "message": "Get subnet info successfully!",
            "data": {
                "name": "luojun",
                "enable_dhcp": true,
                "network_id": "af82b8b3-f05f-4aa7-918c-5d356a7dcbfa",
                "tenant_id": "c9a301e6f6f3472cbf125344699083a9",
                "dns_nameservers": [
                    "8.8.8.8"
                ],
                "allocation_pools": [
                    {
                        "start": "192.168.77.3",
                        "end": "192.168.77.9"
                    }
                ],
                "host_routes": [
                    {
                        "destination": "192.168.200.0/24",
                        "nexthop": "10.56.1.254"
                    }
                ],
                "ip_version": 4,
                "gateway_ip": "192.168.77.1",
                "cidr": "192.168.77.0/24",
                "id": "773aed7a-b935-4bf0-a293-305a9d3dca68"
            },
            "success": 0
        };
        var detailData = {
            title: '',
            basicParams: []
        };
        function setModel(data){
            var pools = [],
                routes = [];
            angular.forEach(data.allocation_pools, function (value, key) {
                pools.push('Start '+ value.start + ' - End' + value.end);
            });
            angular.forEach(data.host_routes, function (value, key) {
                routes.push('Destination '+ value.destination + ' : Next hop ' + value.nexthop);
            });

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
                    key: 'IP 版本',
                    val: data.ip_version ? 'IPv' + data.ip_version : ''
                },
                {
                    key: '网络地址',
                    val: data.cidr
                },
                {
                    type: 'array',
                    key: 'IP allocation pool',
                    val: pools
                },
                {
                    key: 'DHCP Enable',
                    val: data.enable_dhcp ? 'True' : 'False'
                },
                {
                    key: 'Gateway IP',
                    val: data.gateway_ip
                },
                {
                    type: 'array',
                    key: 'Additional routes',
                    val: routes
                },
                {
                    type: 'array',
                    key: 'DNS name server',
                    val: data.dns_nameservers
                }
            ];
        }
        return function(){
            var delay = $q.defer();
            Subnet.get({sid: $route.current.params.id}, function(result){
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
