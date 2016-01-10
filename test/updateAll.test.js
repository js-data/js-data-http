describe('updateAll', function () {
  it('should updateAll', function () {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([Test.p1]))
    }, 30)

    return Test.adapter.updateAll(Test.Post, { author: 'John', age: 30 })
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts')
        Test.assert.equal(Test.requests[0].method, 'PUT')
        Test.assert.deepEqual(data, [Test.p1], 'posts should have been updated')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([Test.p1]))
        }, 30)

        return Test.adapter.updateAll(Test.Post, { author: 'John', age: 30 }, {
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
        Test.assert.equal(Test.requests[1].method, 'PUT')
        Test.assert.deepEqual(data, [Test.p1], 'posts should have been updated')
      })
  })
})
