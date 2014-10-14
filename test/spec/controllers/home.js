'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var HomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of listResource to the scope', function () {
    expect(scope.listResource.length).toBe(10);
  });
});
