'use strict';

/**
 * @ngdoc service
 * @name horizonApp.router
 * @description
 * # router
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Router', function Router($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/routers/:id/', {id: '@id'});
  });
