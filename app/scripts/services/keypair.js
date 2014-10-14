'use strict';

/**
 * @ngdoc service
 * @name horizonApp.keypair
 * @description
 * # keypair
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Keypair', function Keypair($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $resource('/project/keypairs/:id/:op', {id: '@id'});
  });
