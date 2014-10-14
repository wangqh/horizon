'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Port
 * @description
 * # Port
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Port', function Port($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/networks/:nid/ports/:id/:op', {id: '@id', op: 'detail'});
  });
