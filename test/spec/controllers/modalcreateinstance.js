'use strict';

describe('Controller: ModalcreateinstanceCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var ModalcreateinstanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalcreateinstanceCtrl = $controller('ModalcreateinstanceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
