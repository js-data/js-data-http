describe('findAll', function () {
  it('should findAll', function () {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([Test.p1]))
    }, 30)

    return Test.adapter.findAll(Test.Post, {})
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts')
        Test.assert.equal(Test.requests[0].method, 'GET')
        Test.assert.deepEqual(data, [Test.p1], 'posts should have been found')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([Test.p1]))
        }, 30)

        return Test.adapter.findAll(Test.Post, {
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
        Test.assert.equal(Test.requests[1].method, 'GET')
        Test.assert.deepEqual(data, [Test.p1], 'posts should have been found')
      })
  })
})
