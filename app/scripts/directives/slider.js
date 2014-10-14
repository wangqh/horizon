'use strict';

/**
 * @ngdoc directive
 * @name horizonApp.directive:slider
 * @description
 * # slider
 */
angular.module('horizonApp')
  .directive('slider', function () {
        var linkFun = function($scope, element, attrs) {
            var $slider = angular.element(element);
            var option = attrs;
            var tryParseInt = function(key, option) {
                if (option[key]) {
                    option[key] = parseInt(option[key]);
                }
            };

            tryParseInt("min", option);
            tryParseInt("max", option);
            tryParseInt("step", option);

            option = angular.extend({
                value: $scope[option.ngModel],
                change: function(event, ui) {
                    if (attrs.ngModel && ui.value != $scope[attrs.ngModel]) {
                        var express = attrs.ngModel + ' = ' + ui.value;
                        $scope.$apply(express);
                        if (attrs.ngChange) {
                            $scope.$eval(attrs.ngChange);
                        }
                    }
                }
            }, option);
            $slider.slider(option);
            //back
            if (option.ngModel) {
                $scope.$watch(option.ngModel, function(val) {
                    if (val != $slider.slider("value")) {
                        $slider.slider("value", val);
                    }
                });
            }
            console.log(attrs);
        };
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            template: '<div />',
            link: linkFun
        };
    });
