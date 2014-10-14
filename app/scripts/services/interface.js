'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Interface
 * @description
 * # Interface
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Interface', function Interface($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/routers/:rid/:op', {rid: '@id', op: 'addinterface'});
  });
