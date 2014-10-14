'use strict';

describe('Service: Instance', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Instance;
  beforeEach(inject(function (_Instance_) {
    Instance = _Instance_;
  }));

  it('should do something', function () {
    expect(!!Instance).toBe(true);
  });

});
