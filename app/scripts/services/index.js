'use strict';

/**
 * @ngdoc service
 * @name horizonApp.index
 * @description
 * # index
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Index', function Index($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/index');
  });
