'use strict';

/**
 * @ngdoc function
 * @name horizonApp.controller:ModalcreateitemCtrl
 * @description
 * # ModalcreateitemCtrl
 * Controller of the horizonApp
 */
angular.module('horizonApp')
.controller('ModalcreateitemCtrl', function ($scope, $modalInstance, title, formGroup) {

        var hiddenRows = [];
        (function(){
            angular.forEach(formGroup, function (value) {
                if(value.removed){
                    hiddenRows.push(value);
                }
            });
        })();
        if(formGroup.update){
            title = '修改' + title;
        }  else if(title.custom) {
            title = title.custom;
        } else {
            title = '新建' + title;
        }
        $scope.title = title;
        $scope.formGroup = formGroup;

        $scope.formData ={};

        $scope.switchShow = function(list, showWhich){

            var showRows = angular.isArray(showWhich) ? showWhich : (showWhich ? [showWhich] : []);

            showItem(showRows);
        };

        function showItem(items){
            var hideRows = [];
            angular.forEach(hiddenRows, function (value, key) {
                value.removed = true;
            });
            if(!items.length)
                return;
            angular.forEach($scope.formGroup, function (value, key) {
                angular.forEach(items, function (value2) {
                    if(value.key == value2){
                        value.removed = false;
                    }
                });
            });
        }

        $scope.submit = function(){
            if($scope.formGroup.steps)
                $scope.formGroup.tabs = $scope.formGroup.steps;

            if($scope.formGroup.tabs){
                angular.forEach(formGroup.tabs, function (value, key) {
                    if(value.formGroup.modList){
                        var arr = [];
                        angular.forEach(value.formGroup.modList, function (value1, key1) {
                            angular.forEach(value1.checkboxList, function (value2, key2) {
                                if(value2.checked) {
                                    arr.push(value2.id);
                                }
                            });
                            $scope.formData[value1.key] = arr;
                        });
                    }
                    angular.forEach(value.formGroup, function (value2, key2) {
                        if(value2.key) {
                            $scope.formData[value2.key] = value2.val;
                        }
                    });
                });
            } else if($scope.formGroup.modList){
                var arr = [];
                angular.forEach(formGroup.modList, function (value, key) {
                    angular.forEach(value.checkboxList, function (value2, key2) {
                        if(value2.checked) {
                            arr.push(value2.name);
                        }
                    });
                });
                $scope.formData = arr;
            } else if($scope.formGroup){
                angular.forEach(formGroup, function (value, key) {
                    if(value.key && !value.removed){
                        $scope.formData[value.key] = value.val;
                    }
                });
            }

            $modalInstance.close($scope.formData);
        };

        $scope.checkbox = function(item){
            item.checked = !item.checked;
        };



        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.dismiss = function(){
            $modalInstance.dismiss('close');
        }
  });
