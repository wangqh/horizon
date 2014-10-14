'use strict';

describe('Controller: ModalloadingCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var ModalloadingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalloadingCtrl = $controller('ModalloadingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
