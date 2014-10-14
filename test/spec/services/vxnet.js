'use strict';

describe('Service: vxnet', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var vxnet;
  beforeEach(inject(function (_vxnet_) {
    vxnet = _vxnet_;
  }));

  it('should do something', function () {
    expect(!!vxnet).toBe(true);
  });

});
