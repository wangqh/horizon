'use strict';

describe('Service: Subnet', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Subnet;
  beforeEach(inject(function (_Subnet_) {
    Subnet = _Subnet_;
  }));

  it('should do something', function () {
    expect(!!Subnet).toBe(true);
  });

});
