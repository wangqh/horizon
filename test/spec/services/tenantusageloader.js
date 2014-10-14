'use strict';

describe('Service: tenantusageloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var tenantusageloader;
  beforeEach(inject(function (_tenantusageloader_) {
    tenantusageloader = _tenantusageloader_;
  }));

  it('should do something', function () {
    expect(!!tenantusageloader).toBe(true);
  });

});
