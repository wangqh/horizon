'use strict';

describe('Service: Interface', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Interface;
  beforeEach(inject(function (_Interface_) {
    Interface = _Interface_;
  }));

  it('should do something', function () {
    expect(!!Interface).toBe(true);
  });

});
