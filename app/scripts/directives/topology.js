'use strict';

/**
 * @ngdoc directive
 * @name horizonApp.directive:topology
 * @description
 * # topology
 */
angular.module('horizonApp')
  .directive('topology', function () {
    return {
        template: '<div></div>',
        restrict: 'E',
        scope: {
            topologyData: "=value",
            topologyObj: "=?"
        },
        replace: true,
        link: function($scope, $element, $attrs) {

            var options = {};

            //Update when topologys data changes
            $scope.$watch('topologyData', function(value) {
                if (!value)
                    return;

                // use default values if nothing is specified in the given settings
                options.data = $scope.topologyData;
                options.renderTo = options.renderTo || $element[0];

                $scope.topologyObj = new Topology(options);

                $scope.topologyObj.init();

            });
        }
    };
  });
