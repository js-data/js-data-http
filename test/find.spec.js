describe('DSHttpAdapter.find(resourceConfig, id, options)', function () {

  it('should make a GET request', function (done) {
    var _this = this;

    dsHttpAdapter.find(Post, 1).then(function (data) {
      assert.deepEqual(data, p1, 'post should have been found');

      dsHttpAdapter.find(Post, 1, { basePath: 'api2' }).then(function (data) {
        assert.deepEqual(data, p1, 'post should have been found');
        assert.equal(queryTransform.callCount, 0, 'queryTransform should not have been called');
        done();
      }).catch(function (err) {
        console.error(err.stack);
        done('should not have rejected');
      });

      setTimeout(function () {
        assert.equal(2, _this.requests.length);
        assert.equal(_this.requests[1].url, 'api2/posts/1');
        assert.equal(_this.requests[1].method, 'GET');
        _this.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
      }, 10);
    }).catch(function (err) {
      console.error(err.stack);
      done('should not have rejected');
    });

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts/1');
      assert.equal(_this.requests[0].method, 'GET');
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
    }, 10);
  });

  it('should use default configs', function (done) {
    var _this = this;

    dsHttpAdapter.defaults.httpConfig.params = { test: 'test' };
    dsHttpAdapter.defaults.httpConfig.headers = { Authorization: 'test' };

    dsHttpAdapter.find(Post, 1).then(function (data) {
      assert.deepEqual(data, p1, 'post should have been found');

      delete dsHttpAdapter.defaults.httpConfig.params;
      delete dsHttpAdapter.defaults.httpConfig.headers;
      done();
    }).catch(function (err) {
      console.error(err.stack);
      done('should not have rejected');
    });

    setTimeout(function () {
      assert.equal(1, _this.requests.length);
      assert.equal(_this.requests[0].url, 'api/posts/1?test=test');
      assert.equal(_this.requests[0].method, 'GET');
      assert.deepEqual({
        Authorization: 'test',
        Accept: 'application/json, text/plain, */*'
      }, _this.requests[0].requestHeaders);
      _this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(p1));
    }, 10);
  });

  it('should log errors', function (done) {
    var _this = this;
    var loggedError;

    dsHttpAdapter.defaults.error = function (err) {
      loggedError = err;
    };

    dsHttpAdapter.find(Post, 1).then(function () {
      done('Should not have succeeded!');
    }, function () {
      assert.isString(loggedError);
      assert.isTrue(loggedError.indexOf('api/posts/1') !== -1);
      done();
    });

    setTimeout(function () {
      try {
        assert.equal(1, _this.requests.length);
        assert.equal(_this.requests[0].url, 'api/posts/1');
        assert.equal(_this.requests[0].method, 'GET');
      } catch (err) {
        done(err);
      }
      _this.requests[0].respond(404, { 'Content-Type': 'text/plain' }, 'Not Found');
    }, 10);
  });
});
