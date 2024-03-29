'use strict';

describe('Controller: InstancesCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var InstancesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstancesCtrl = $controller('InstancesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
