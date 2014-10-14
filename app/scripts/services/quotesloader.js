'use strict';

/**
 * @ngdoc service
 * @name horizonApp.QuotesLoader
 * @description
 * # QuotesLoader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('QuotesLoader', function QuotesLoader($resource, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var Quotes = $resource('api/quotes');
        var mockData = [
            {
                total: 2,
                name: '主机',
                count: 0
            },
            {
                total: 5,
                name: '硬盘',
                count: 0
            },
            {
                total: 5,
                name: '备份',
                count: 0
            },
            {
                total: 5,
                name: '路由器',
                count: 0
            },
            {
                total: 5,
                name: '私有网络',
                count: 0
            }
        ];

        return function(){
            var delay = $q.defer();
            Quotes.query(function(quotes){
                delay.resolve(quotes);
            }, function(){
                delay.reject(mockData)
            });
            return delay.promise;
        }
  });
