describe('DSHttpAdapter.create(resourceConfig, attrs, options)', function () {

  it('should make a POST request', function (done) {
    var server = http.createServer(function (req, res) {
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end(DSUtils.toJson(p1));
    }).listen(4444, function () {
      dsHttpAdapter.create(Post, {author: 'John', age: 30}).then(function (data) {
        assert.deepEqual(data, p1, 'post should have been created');
        assert.equal(queryTransform.callCount, 1, 'queryTransform should have been called');
        server.close();
        done();
      }).catch(done);
    });
  });
});
