'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Topologyloader
 * @description
 * # Topologyloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Topologyloader', function Topologyloader($q, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            data: {
                routers: [
                    {
                        name: '路由器1',
                        id: '934bcffb-9028-4cde-9c86-819c80bba326',
                        subnet: {
                            name: '子网1',
                            id: 'af82b8b3-f05f-4aa7-918c-5d356a7dcbfa',
                            instances: [
                                {
                                    id: 'bdc00568-c701-44c1-a6b2-02add4efddbe',
                                    name: '服务器1'
                                },
                                {
                                    name: '服务器2'
                                },
                                {
                                    name: '服务器3'
                                }
                            ]
                        }
                    },
                    {
                        name: '路由器2',
                        subnet: {
                            name: '子网2',
                            instances: [
                                {
                                    name: '服务器4'
                                },
                                {
                                    name: '服务器5'
                                },
                                {
                                    name: '服务器6'
                                }
                            ]
                        }
                    },
                    {
                        name: '路由器3',
                        subnet: {
                            name: '子网3',
                            instances: [
                                {
                                    name: '服务器7'
                                },
                                {
                                    name: '服务器8'
                                },
                                {
                                    name: '服务器9'
                                },
                                {
                                    name: '服务器10'
                                },
                                {
                                    name: '服务器11'
                                },
                                {
                                    name: '服务器12'
                                }
                            ]
                        }
                    },
                    {
                        name: '路由器4',
                        subnet: {
                            name: '子网4',
                            instances: [
                                {
                                    name: '服务器13'
                                },
                                {
                                    name: '服务器14'
                                },
                                {
                                    name: '服务器15'
                                },
                                {
                                    name: '服务器16'
                                },
                                {
                                    name: '服务器17'
                                }
                            ]
                        }
                    },
                    {
                        name: '路由器5',
                        subnet: {
                            name: '子网5',
                            instances: [
                                {
                                    name: '服务器18'
                                }
                            ]
                        }
                    },
                    {
                        name: '路由器6',
                        subnet: {
                            name: '子网6'
                        }
                    },
                    {
                        name: '路由器7',
                        subnet: {
                            name: '子网7'
                        }
                    }
                ]
            }
        };

        var topology = $resource('/project/networks/topology');

        return function(){
            var delay = $q.defer();

            topology.get(function(result){
                delay.resolve(result.data);
            },function(){
                delay.resolve(mock.data);
            });
            return delay.promise;
        }
  });
