describe('DSHttpAdapter.create(resourceConfig, attrs, options)', function () {

  it('should make a POST request', function () {
    var _this = this;

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts');
      assert.equal(_this.requests[0].method, 'POST');
      assert.equal(_this.requests[0].requestBody, DSUtils.toJson({ author: 'John', age: 30 }));
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, DSUtils.toJson(p1));
    }, 30);

    return dsHttpAdapter.create(Post, { author: 'John', age: 30 }).then(function (data) {
      assert.deepEqual(data, p1, 'post should have been created');

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api2/posts');
        assert.equal(_this.requests[1].requestBody, DSUtils.toJson({ author: 'John', age: 30 }));
        _this.requests[1].respond(200, { 'Content-Type': 'application/json' }, DSUtils.toJson(p1));
      }, 30);

      return dsHttpAdapter.create(Post, { author: 'John', age: 30 }, { basePath: 'api2' });
    }).then(function (data) {
      assert.deepEqual(data, p1, 'post should have been created');

      assert.equal(queryTransform.callCount, 2, 'queryTransform should have been called twice');
    });
  });
});
