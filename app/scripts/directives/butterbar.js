'use strict';

/**
 * @ngdoc directive
 * @name horizonApp.directive:butterbar
 * @description
 * # butterbar
 */
angular.module('horizonApp')
  .directive('butterbar', function ($rootScope) {
    return {
      link: function postLink(scope, element, attrs) {
          element.addClass('hide');

          $rootScope.$on('$routeChangeStart', function(){
              element.removeClass('hide');
          });

          $rootScope.$on('$routeChangeSuccess', function(){
              element.addClass('hide');
          });
      }
    };
  });
