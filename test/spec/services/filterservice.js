'use strict';

describe('Service: FilterService', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var FilterService;
  beforeEach(inject(function (_FilterService_) {
    FilterService = _FilterService_;
  }));

  it('should do something', function () {
    expect(!!FilterService).toBe(true);
  });

});
