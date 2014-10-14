'use strict';

/**
 * @ngdoc service
 * @name horizonApp.FilterService
 * @description
 * # FilterService
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Filterservice', function Filterservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return {
            activeFilters: {},
            searchText: ''
        }
  });
