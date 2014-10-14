'use strict';

describe('Service: userloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var userloader;
  beforeEach(inject(function (_userloader_) {
    userloader = _userloader_;
  }));

  it('should do something', function () {
    expect(!!userloader).toBe(true);
  });

});
