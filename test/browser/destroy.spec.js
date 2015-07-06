describe('DSHttpAdapter.destroy(resourceConfig, id, options)', function () {

  it('should make a DELETE request', function () {
    var _this = this;

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts/1');
      assert.equal(_this.requests[0].method, 'DELETE');
      _this.requests[0].respond(200, { 'Content-Type': 'text/plain' }, '1');
    }, 30);

    return dsHttpAdapter.destroy(Post, 1).then(function (data) {
      assert.deepEqual(data, 1, 'post should have been deleted');

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api2/posts/1');
        assert.equal(_this.requests[1].method, 'DELETE');
        _this.requests[1].respond(200, { 'Content-Type': 'text/plain' }, '1');
      }, 30);

      return dsHttpAdapter.destroy(Post, 1, { basePath: 'api2' });
    }).then(function (data) {
      assert.deepEqual(data, 1, 'post should have been deleted');
      assert.equal(queryTransform.callCount, 2, 'queryTransform should have been called twice');
    });
  });
});
