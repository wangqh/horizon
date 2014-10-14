'use strict';

describe('Service: router', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var router;
  beforeEach(inject(function (_router_) {
    router = _router_;
  }));

  it('should do something', function () {
    expect(!!router).toBe(true);
  });

});
