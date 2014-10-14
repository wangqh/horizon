'use strict';

describe('Controller: ModaldownloadkeypairCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var ModaldownloadkeypairCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModaldownloadkeypairCtrl = $controller('ModaldownloadkeypairCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
