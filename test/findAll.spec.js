describe('dsHttpAdapter.findAll(resourceConfig, params, options)', function () {

  it('should make a GET request', function () {
    var _this = this;

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts');
      assert.equal(_this.requests[0].method, 'GET');
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([p1]));
    }, 30);

    return dsHttpAdapter.findAll(Post, {}).then(function (data) {
      assert.deepEqual(data, [p1], 'posts should have been found');

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api2/posts?where=%7B%22author%22:%7B%22%3D%3D%22:%22John%22%7D%7D');
        assert.equal(_this.requests[1].method, 'GET');
        _this.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([p1]));
      }, 30);

      return dsHttpAdapter.findAll(Post, {
        where: {
          author: {
            '==': 'John'
          }
        }
      }, { basePath: 'api2' });
    }).then(function (data) {
      assert.deepEqual(data, [p1], 'posts should have been found');
      assert.equal(queryTransform.callCount, 2, 'queryTransform should have been called');
    });
  });
});
