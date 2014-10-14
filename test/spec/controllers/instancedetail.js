'use strict';

describe('Controller: InstancedetailCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var InstancedetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstancedetailCtrl = $controller('InstancedetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
