'use strict';

describe('Service: modalloading', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var modalloading;
  beforeEach(inject(function (_modalloading_) {
    modalloading = _modalloading_;
  }));

  it('should do something', function () {
    expect(!!modalloading).toBe(true);
  });

});
