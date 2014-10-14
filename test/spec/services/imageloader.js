'use strict';

describe('Service: Imageloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Imageloader;
  beforeEach(inject(function (_Imageloader_) {
    Imageloader = _Imageloader_;
  }));

  it('should do something', function () {
    expect(!!Imageloader).toBe(true);
  });

});
