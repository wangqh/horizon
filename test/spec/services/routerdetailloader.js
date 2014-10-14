'use strict';

describe('Service: routerDetailLoader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var routerDetailLoader;
  beforeEach(inject(function (_routerDetailLoader_) {
    routerDetailLoader = _routerDetailLoader_;
  }));

  it('should do something', function () {
    expect(!!routerDetailLoader).toBe(true);
  });

});
