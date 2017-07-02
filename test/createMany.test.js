describe('createMany', function () {
  it('should createMany', function () {
    var Test = this
    var many = [{ author_id: 2, text: 'bar' }, { author_id: 2, text: 'foo' }]

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(many))
    }, 5)

    return Test.Post.createMany(many).then(function (result) {
      Test.assert.equal(Test.requests[0].url, 'api/posts')
      Test.assert.equal(Test.requests[0].method, 'POST')
      Test.assert.equal(Test.requests[0].requestBody, JSON.stringify(many))
    })
  })
})
