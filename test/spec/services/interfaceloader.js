'use strict';

describe('Service: addinterfaceloader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var addinterfaceloader;
  beforeEach(inject(function (_addinterfaceloader_) {
    addinterfaceloader = _addinterfaceloader_;
  }));

  it('should do something', function () {
    expect(!!addinterfaceloader).toBe(true);
  });

});
