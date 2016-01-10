describe('destroyAll', function () {
  it('should destroyAll', function () {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(204)
    }, 30)

    return Test.adapter.destroyAll(Test.Post, {})
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts')
        Test.assert.equal(Test.requests[0].method, 'DELETE')
        Test.assert.equal('', data, 'posts should have been found')

        setTimeout(function () {
          Test.requests[1].respond(204)
        }, 30)

        return Test.adapter.destroyAll(Test.Post, {
          where: {
            author: {
              '==': 'John'
            }
          }
        }, { basePath: 'api2' })
      })
      .then(function (data) {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url.indexOf('api2/posts?where='), 0)
        Test.assert.equal(Test.requests[1].method, 'DELETE')
        Test.assert.equal('', data, 'posts should have been destroyed')
      })
  })
})
