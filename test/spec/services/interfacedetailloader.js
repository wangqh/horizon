'use strict';

describe('Service: Interfacedetailloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Interfacedetailloader;
  beforeEach(inject(function (_Interfacedetailloader_) {
    Interfacedetailloader = _Interfacedetailloader_;
  }));

  it('should do something', function () {
    expect(!!Interfacedetailloader).toBe(true);
  });

});
