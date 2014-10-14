'use strict';

describe('Controller: TenantusageCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var TenantusageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TenantusageCtrl = $controller('TenantusageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
