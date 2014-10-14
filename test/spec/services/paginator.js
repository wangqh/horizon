'use strict';

describe('Service: Paginator', function () {

  // load the service's module
  beforeEach(module('horizonApp'));

  // instantiate service
  var Paginator;

    var items = [1, 2, 3, 4, 5, 6];
    var fetchFn = function(offset, limit, callback){
        callback(items.slice(offset, offset + limit));
    };

  beforeEach(inject(function (_Paginator_) {
    Paginator = _Paginator_(fetchFn, 3);
  }));

  it('should show items on the first page', function () {
      expect(Paginator.currentPageItems).toEqual([1, 2, 3]);
      expect(Paginator.hasNext()).toBeTruthy();
      expect(Paginator.hasPrevious()).toBeFalsy();
  });

    it('should go to next page', function(){
        Paginator.next();
        expect(Paginator.currentPageItems).toEqual([4, 5, 6]);
        expect(Paginator.hasNext()).toBeFalsy();
        expect(Paginator.hasPrevious()).toBeTruthy();
    });

    it('should go to previous page', function(){
        Paginator.next();
        expect(Paginator.currentPageItems).toEqual([4, 5, 6]);
        Paginator.previous();
        expect(Paginator.currentPageItems).toEqual([1, 2, 3]);
    });

    it('should not go next from last page', function(){
        Paginator.next();
        expect(Paginator.currentPageItems).toEqual([4, 5, 6]);
        Paginator.next();
        expect(Paginator.currentPageItems).toEqual([4, 5, 6]);
    });

    it('should not go back from first page', function(){
        Paginator.previous();
        expect(Paginator.currentPageItems).toEqual([1, 2, 3]);
    });

});
