'use strict';

/**
 * @ngdoc service
 * @name horizonApp.user
 * @description
 * # user
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('User', function User($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/user/:id');
  });
