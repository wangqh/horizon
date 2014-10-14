'use strict';

describe('Service: tenantcreateloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var tenantcreateloader;
  beforeEach(inject(function (_tenantcreateloader_) {
    tenantcreateloader = _tenantcreateloader_;
  }));

  it('should do something', function () {
    expect(!!tenantcreateloader).toBe(true);
  });

});
