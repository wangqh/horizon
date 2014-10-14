'use strict';

describe('Service: tenant', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var tenant;
  beforeEach(inject(function (_tenant_) {
    tenant = _tenant_;
  }));

  it('should do something', function () {
    expect(!!tenant).toBe(true);
  });

});
