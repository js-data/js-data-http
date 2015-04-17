describe('DSHttpAdapter.destroyAll(resourceConfig, params, options)', function () {

  it('should make a DELETE request', function () {
    var _this = this;

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts');
      assert.equal(_this.requests[0].method, 'DELETE');
      _this.requests[0].respond(204);
    }, 30);

    return dsHttpAdapter.destroyAll(Post, {}).then(function (data) {
      assert.equal('', data, 'posts should have been found');

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api2/posts?where=%7B%22author%22:%7B%22%3D%3D%22:%22John%22%7D%7D');
        assert.equal(_this.requests[1].method, 'DELETE');
        _this.requests[1].respond(204);
      }, 30);

      return dsHttpAdapter.destroyAll(Post, {
        where: {
          author: {
            '==': 'John'
          }
        }
      }, { basePath: 'api2' });
    }).then(function (data) {
      assert.equal('', data, 'posts should have been destroyed');
      assert.equal(queryTransform.callCount, 2, 'queryTransform should have been called');
    });
  });
});
