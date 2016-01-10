describe('create', function () {
  it('should create', function () {
    var Test = this
    var post = {
      author: 'John',
      age: 30
    }

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
    }, 30)

    return Test.adapter.create(Test.Post, post)
      .then(function (data) {
        Test.assert.equal(Test.requests[0].url, 'api/posts')
        Test.assert.equal(Test.requests[0].method, 'POST')
        Test.assert.equal(Test.requests[0].requestBody, JSON.stringify(post))
        Test.assert.deepEqual(data, Test.p1, 'post should have been created')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
        }, 30)

        return Test.adapter.create(Test.Post, post, {
          basePath: 'api2'
        })
      })
      .then(function (data) {
        Test.assert.equal(Test.requests[1].url, 'api2/posts')
        Test.assert.equal(Test.requests[1].requestBody, JSON.stringify(post))
        Test.assert.deepEqual(data, Test.p1, 'post should have been created')
      })
  })
})
