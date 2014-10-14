'use strict';

/**
 * @ngdoc service
 * @name horizonApp.Image
 * @description
 * # Image
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Image', function Image($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/images/:op/:id', {id: '@id'});
  });
