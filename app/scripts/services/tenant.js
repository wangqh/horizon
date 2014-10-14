'use strict';

/**
 * @ngdoc service
 * @name horizonApp.tenant
 * @description
 * # tenant
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Tenant', function Tenant($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/admin/tenants/:id/:op', {id: '@id'});
  });
