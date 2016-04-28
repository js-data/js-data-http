describe('update', function () {
  it('should update', function () {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
    }, 30)

    return Test.adapter.update(Test.Post, 1, { author: 'John', age: 30 })
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts/1')
        Test.assert.equal(Test.requests[0].method, 'PUT')
        Test.assert.equal(Test.requests[0].requestBody, JSON.stringify({ author: 'John', age: 30 }))
        Test.assert.deepEqual(data, Test.p1, 'post 5 should have been updated')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
        }, 30)

        return Test.adapter.update(Test.Post, 1, { author: 'John', age: 30 }, { basePath: 'api2' })
      })
      .then(function (data) {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url, 'api2/posts/1')
        Test.assert.equal(Test.requests[1].method, 'PUT')
        Test.assert.equal(Test.requests[1].requestBody, JSON.stringify({ author: 'John', age: 30 }))
        Test.assert.deepEqual(data, Test.p1, 'post 5 should have been updated')
      })
  })
})
