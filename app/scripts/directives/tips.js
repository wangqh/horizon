'use strict';

/**
 * @ngdoc directive
 * @name horizonApp.directive:tips
 * @description
 * # tips
 */
angular.module('horizonApp')
  .directive('tips', function ($transition, $timeout) {
    return {
      templateUrl: 'views/tips.html',
      restrict: 'E',
      replace: true,
      scope: {
          list: '='
      },
      controller: function($scope){
          $scope.closeTip = function(index){
              $scope.list.splice(index, 1);
          }
      }
    };
  });
