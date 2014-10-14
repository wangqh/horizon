'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('horizonApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a object of zone to the scope', function () {
    expect(scope.zone).toEqual({
        name: '广东1区',
        enName: 'GD1'
    });
  });
});
