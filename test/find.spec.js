describe('DSHttpAdapter.find(resourceConfig, id, options)', function () {

  it('should make a GET request', function () {
    var _this = this;

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts/1');
      assert.equal(_this.requests[0].method, 'GET');
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
    }, 30);

    return dsHttpAdapter.find(Post, 1).then(function (data) {
      assert.deepEqual(data, p1, 'post should have been found');

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api2/posts/1');
        assert.equal(_this.requests[1].method, 'GET');
        _this.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
      }, 30);

      return dsHttpAdapter.find(Post, 1, { basePath: 'api2' });
    }).then(function (data) {
      assert.deepEqual(data, p1, 'post should have been found');
      assert.equal(queryTransform.callCount, 2, 'queryTransform should have been called twice');
    });
  });

  it('should allow overriding urlPath', function () {
    var _this = this;

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/foo/bar/beep/boop/1');
      assert.equal(_this.requests[0].method, 'GET');
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
    }, 30);

    return Post.find(1, { urlPath: '/foo/bar/beep/boop/1' }).then(function (data) {
      assert.equal(data.id, p1.id, 'post should have been found');
      assert.equal(queryTransform.callCount, 1, 'queryTransform should have been called twice');
    });
  });

  it('should use default configs', function () {
    var _this = this;

    dsHttpAdapter.defaults.httpConfig.params = { test: 'test' };
    dsHttpAdapter.defaults.httpConfig.headers = { Authorization: 'test' };

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts/1?test=test');
      assert.equal(_this.requests[0].method, 'GET');
      assert.deepEqual({
        Authorization: 'test',
        Accept: 'application/json, text/plain, */*'
      }, _this.requests[0].requestHeaders);
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
    }, 30);

    return dsHttpAdapter.find(Post, 1).then(function (data) {
      assert.deepEqual(data, p1, 'post should have been found');

      delete dsHttpAdapter.defaults.httpConfig.params;
      delete dsHttpAdapter.defaults.httpConfig.headers;
    });
  });

  it('should log errors', function () {
    var _this = this;
    var loggedError;

    dsHttpAdapter.defaults.error = function (err) {
      loggedError = err;
    };

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts/1');
      assert.equal(_this.requests[0].method, 'GET');
      _this.requests[0].respond(404, { 'Content-Type': 'text/plain' }, 'Not Found');
    }, 30);

    return dsHttpAdapter.find(Post, 1).then(function () {
      throw new Error('Should not have succeeded!');
    }, function () {
      console.log(loggedError);
      assert.isString(loggedError);
      assert.isTrue(loggedError.indexOf('api/posts/1') !== -1, loggedError);
    });
  });

  it('should use suffixes', function () {
    var _this = this;

    var Thing = datastore.defineResource({
      name: 'thing',
      endpoint: 'things',
      suffix: '.xml'
    });

    var otherAdapter = new DSHttpAdapter({
      suffix: '.json'
    });

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'things/1.xml');
      assert.equal(_this.requests[0].method, 'GET');
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ id: 1 }));
    }, 30);

    return dsHttpAdapter.find(Thing, 1).then(function () {

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api/posts/1.json');
        assert.equal(_this.requests[1].method, 'GET');
        _this.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ id: 1 }));
      }, 30);

      return otherAdapter.find(Post, 1);
    });
  });
});
