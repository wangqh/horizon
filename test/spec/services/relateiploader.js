'use strict';

describe('Service: relateIPloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var relateIPloader;
  beforeEach(inject(function (_relateIPloader_) {
    relateIPloader = _relateIPloader_;
  }));

  it('should do something', function () {
    expect(!!relateIPloader).toBe(true);
  });

});
