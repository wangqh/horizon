'use strict';

describe('Service: routercreateloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var routercreateloader;
  beforeEach(inject(function (_routercreateloader_) {
    routercreateloader = _routercreateloader_;
  }));

  it('should do something', function () {
    expect(!!routercreateloader).toBe(true);
  });

});
