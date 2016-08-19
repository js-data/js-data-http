describe('sum', function () {
  it('should include count=true in query_params', function (done) {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"count": 5}')
    }, 5)

    Test.adapter.count(Test.Post).then(function (result) {
      Test.assert.equal(Test.requests[0].url, 'api/posts?count=true')
      done()
    })
  })
})
