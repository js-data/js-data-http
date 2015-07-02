describe('DSHttpAdapter.update(resourceConfig, id, attrs, options)', function () {

  it('should make a PUT request', function () {
    var _this = this;

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts/1');
      assert.equal(_this.requests[0].method, 'PUT');
      assert.equal(_this.requests[0].requestBody, JSON.stringify({ author: 'John', age: 30 }));
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
    }, 30);

    return dsHttpAdapter.update(Post, 1, { author: 'John', age: 30 }).then(function (data) {
      assert.deepEqual(data, p1, 'post 5 should have been updated');

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api2/posts/1');
        assert.equal(_this.requests[1].method, 'PUT');
        assert.equal(_this.requests[1].requestBody, JSON.stringify({ author: 'John', age: 30 }));
        _this.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
      }, 30);

      return dsHttpAdapter.update(Post, 1, { author: 'John', age: 30 }, { basePath: 'api2' });
    }).then(function (data) {
      assert.deepEqual(data, p1, 'post 5 should have been updated');
      assert.equal(queryTransform.callCount, 2, 'queryTransform should have been called twice');
    });
  });
});
