'use strict';

describe('Service: vxnetdetailloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var vxnetdetailloader;
  beforeEach(inject(function (_vxnetdetailloader_) {
    vxnetdetailloader = _vxnetdetailloader_;
  }));

  it('should do something', function () {
    expect(!!vxnetdetailloader).toBe(true);
  });

});
