describe('createMany', function () {
  it('should createMany', function (done) {
    var Test = this
    var many = [{ author_id: 2, text: 'bar', id: 1 }, { author_id: 2, text: 'foo', id: 2 }]

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(many))
    }, 5)

    Test.Post.updateMany(many).then(function (result) {
      Test.assert.equal(Test.requests[0].url, 'api/posts')
      Test.assert.equal(Test.requests[0].method, 'PUT')
      Test.assert.equal(Test.requests[0].requestBody, JSON.stringify(many))
      done()
    })
  })
})
