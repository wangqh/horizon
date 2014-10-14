'use strict';

describe('Service: Instancedetailloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Instancedetailloader;
  beforeEach(inject(function (_Instancedetailloader_) {
    Instancedetailloader = _Instancedetailloader_;
  }));

  it('should do something', function () {
    expect(!!Instancedetailloader).toBe(true);
  });

});
