'use strict';

describe('Directive: myNav', function () {

  // load the directive's module
  beforeEach(module('horizonApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-nav></my-nav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myNav directive');
  }));
});
