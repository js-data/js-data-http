describe('destroy', function () {
  it('should destroy', function () {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'text/plain' }, '1')
    }, 30)

    return Test.adapter.destroy(Test.Post, 1)
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts/1')
        Test.assert.equal(Test.requests[0].method, 'DELETE')
        Test.assert.deepEqual(data, 1, 'post should have been deleted')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'text/plain' }, '1')
        }, 30)

        return Test.adapter.destroy(Test.Post, 1, { basePath: 'api2' })
      })
      .then(function (data) {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url, 'api2/posts/1')
        Test.assert.equal(Test.requests[1].method, 'DELETE')
        Test.assert.deepEqual(data, 1, 'post should have been deleted')
      })
  })
})
