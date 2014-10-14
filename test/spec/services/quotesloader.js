'use strict';

describe('Service: QuotesLoader', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var QuotesLoader;
  beforeEach(inject(function (_QuotesLoader_) {
    QuotesLoader = _QuotesLoader_;
  }));

  it('should do something', function () {
    expect(!!QuotesLoader).toBe(true);
  });

});
