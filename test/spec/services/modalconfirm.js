'use strict';

describe('Service: Modalconfirm', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Modalconfirm;
  beforeEach(inject(function (_Modalconfirm_) {
    Modalconfirm = _Modalconfirm_;
  }));

  it('should do something', function () {
    expect(!!Modalconfirm).toBe(true);
  });

});
