'use strict';

describe('Service: imagecreateloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var imagecreateloader;
  beforeEach(inject(function (_imagecreateloader_) {
    imagecreateloader = _imagecreateloader_;
  }));

  it('should do something', function () {
    expect(!!imagecreateloader).toBe(true);
  });

});
