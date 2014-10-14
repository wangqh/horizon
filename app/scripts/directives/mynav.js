'use strict';

/**
 * @ngdoc directive
 * @name horizonApp.directive:myNav
 * @description
 * # myNav
 */
angular.module('horizonApp')
  .directive('myNav', function () {
    return {
      templateUrl: 'views/nav.html',
      restrict: 'E',
      replace: true,
      scope: {
         list: '='
      },
      controller: function ($scope, $element, $attrs) {
          $scope.selectItem = function(menuItem){
              if ($scope.$root.selectedNode)
                  $scope.$root.selectedNode.selected = 0;

              menuItem.selected = 1;
              $scope.$root.selectedNode = menuItem;
          }
      }
    };
  });
