'use strict';

describe('Controller: ModalchangeitemCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var ModalchangeitemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalchangeitemCtrl = $controller('ModalchangeitemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
