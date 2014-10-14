'use strict';

/**
 * @ngdoc service
 * @name horizonApp.relateIPloader
 * @description
 * # relateIPloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Relateiploader', function Relateiploader($q, Instance, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mockData = {
            "message": "Success: Associated floting ip.",
            "data": {
                "fips": [
                    {
                        "id": "0f2d374e-f66d-481c-88b1-9a73eb0d666e",
                        "name": "192.168.74.16"
                    },
                    {
                        "id": "888ee7db-3c85-46cf-b5ca-56fbcdd11c12",
                        "name": "192.168.74.11"
                    },
                    {
                        "id": "b4b89386-e1f6-4740-bc13-645f5601c4aa",
                        "name": "192.168.74.12"
                    },
                    {
                        "id": "bb9cfe45-edac-458f-9b3a-2325f4f9b317",
                        "name": "192.168.74.13"
                    },
                    {
                        "id": "c717513b-5d0e-47ef-8f35-aa71bdcd9ea0",
                        "name": "192.168.74.14"
                    },
                    {
                        "id": "c78def8c-c9e1-40e9-a8f2-854fddb864c0",
                        "name": "192.168.74.15"
                    }
                ],
                "ports": [
                    {
                        "id": "1b7dfbd3-38b3-4122-b2ec-3b3b8d3063ed_10.1.1.13",
                        "name": "luobangze_instance: 10.1.1.13"
                    },
                    {
                        "id": "641fd86a-bc52-4662-9474-bb49425b8289_10.2.2.6",
                        "name": "LUOJUN_INSTANCE: 10.2.2.6"
                    },
                    {
                        "id": "b8b670b4-7a09-4ffa-a141-0db96e88bc7a_10.2.2.3",
                        "name": "LuoJun_instance: 10.2.2.3"
                    },
                    {
                        "id": "c64507a2-9fc4-4a8e-9522-6f1ed5b55140_10.1.1.11",
                        "name": "instance01: 10.1.1.11"
                    },
                    {
                        "id": "cdf4dbe9-ed40-4315-ad43-ecfeb0d34182_10.2.2.5",
                        "name": "luobangze_instance: 10.2.2.5"
                    }
                ]
            },
            "success": 1
        };



        return function(id, addMethod){

            var formRows = [
                {
                    title: ' IP 地址',
                    key: 'fip_id',
                    val:'',
                    type: 'select',
                    addBtn: {
                        text: '分配一个公网IP',
                        desc: '您可以从公网池中',
                        method: addMethod
                    },
                    required: true,
                    options: []
                },
                {
                    title: '端口',
                    key: 'port_id',
                    val:'',
                    type: 'select',
                    required: true,
                    options: []
                }
            ];
            var delay = $q.defer();


            Instance.get({id: id, op: 'associate_floting_ip'}, function(result){
                formRows[0].options = result.data.fips;
                formRows[1].options = result.data.ports;
                delay.resolve(formRows);

            }, function(){
                formRows[0].options = mockData.data.fips;
                formRows[1].options = mockData.data.ports;

                //delay.reject('unable to fetch public ip')
                $timeout(function(){
                    delay.resolve(formRows);//测试用
                }, 1000);
            });
            return delay.promise;
        }
  });
