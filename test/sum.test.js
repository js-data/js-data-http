describe('sum', function () {
  it('should sum=<field> in query_params', function (done) {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"sum": 5}')
    }, 5)

    Test.adapter.sum(Test.Post, 'num_views').then(function (result) {
      Test.assert.equal(Test.requests[0].url, 'api/posts?sum=num_views')
      done()
    })
  })
})
