'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Subnet
 * @description
 * # Subnet
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Subnet', function Subnet($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/networks/:id/subnets/:sid/:op', {id: '@id'});
  });
