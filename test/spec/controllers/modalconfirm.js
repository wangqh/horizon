'use strict';

describe('Controller: ModalconfirmCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var ModalconfirmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalconfirmCtrl = $controller('ModalconfirmCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
