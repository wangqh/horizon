'use strict';

describe('Service: keypair', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var keypair;
  beforeEach(inject(function (_keypair_) {
    keypair = _keypair_;
  }));

  it('should do something', function () {
    expect(!!keypair).toBe(true);
  });

});
