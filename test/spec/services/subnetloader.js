'use strict';

describe('Service: Subnetloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Subnetloader;
  beforeEach(inject(function (_Subnetloader_) {
    Subnetloader = _Subnetloader_;
  }));

  it('should do something', function () {
    expect(!!Subnetloader).toBe(true);
  });

});
