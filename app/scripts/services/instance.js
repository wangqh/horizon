'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Instance
 * @description
 * # Instance
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Instance', function Instance($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/instances/:id/:op', {id: '@id'});
  });
