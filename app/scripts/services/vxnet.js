'use strict';

/**
 * @ngdoc service
 * @name horizonApp.vxnet
 * @description
 * # vxnet
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Vxnet', function Vxnet($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/networks/:id/:op', {id: '@id'});
  });
