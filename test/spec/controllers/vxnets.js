'use strict';

describe('Controller: VxnetsCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var VxnetsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VxnetsCtrl = $controller('VxnetsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
