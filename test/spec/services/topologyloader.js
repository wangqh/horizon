'use strict';

describe('Service: Topologyloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Topologyloader;
  beforeEach(inject(function (_Topologyloader_) {
    Topologyloader = _Topologyloader_;
  }));

  it('should do something', function () {
    expect(!!Topologyloader).toBe(true);
  });

});
