describe('createMany', function () {
  it('should createMany', function (done) {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, '')
    }, 5)

    var many = [{ author_id: 2, text: 'bar' }, { author_id: 2, text: 'foo' }]
    Test.Post.createMany(many).then(function (result) {
      Test.assert.equal(Test.requests[0].url, 'api/posts')
      Test.assert.equal(Test.requests[0].method, 'POST')
      Test.assert.equal(Test.requests[0].requestBody, JSON.stringify(many))
      done()
    })
  })
})
