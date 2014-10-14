'use strict';

describe('Directive: tips', function () {

  // load the directive's module
  beforeEach(module('horizonApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tips></tips>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tips directive');
  }));
});
