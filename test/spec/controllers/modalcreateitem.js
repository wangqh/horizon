'use strict';

describe('Controller: ModalcreateitemCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var ModalcreateitemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalcreateitemCtrl = $controller('ModalcreateitemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
