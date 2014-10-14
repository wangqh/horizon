'use strict';

describe('Service: homeloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var homeloader;
  beforeEach(inject(function (_homeloader_) {
    homeloader = _homeloader_;
  }));

  it('should do something', function () {
    expect(!!homeloader).toBe(true);
  });

});
