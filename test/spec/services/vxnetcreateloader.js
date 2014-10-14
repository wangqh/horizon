'use strict';

describe('Service: vxnetcreateloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var vxnetcreateloader;
  beforeEach(inject(function (_vxnetcreateloader_) {
    vxnetcreateloader = _vxnetcreateloader_;
  }));

  it('should do something', function () {
    expect(!!vxnetcreateloader).toBe(true);
  });

});
