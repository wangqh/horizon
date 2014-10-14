'use strict';

describe('Controller: ModalQuotesCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var ModalQuotesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalQuotesCtrl = $controller('ModalQuotesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
