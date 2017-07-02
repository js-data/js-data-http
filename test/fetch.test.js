describe('fetch', function () {
  it.skip('should fetch from a URL', function () {
    var Test = this
    if (!Test.adapter.hasFetch) {
      return
    }
    if (!Test.TEST_FETCH) {
      return
    }

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}')
    }, 300)

    return Test.adapter.fetch({
      method: 'get',
      params: { active: true },
      url: '/api/foos'
    }).then(function (response) {
      var request = Test.requests[0]
      Test.assert.equal(request.method, 'GET')
      Test.assert.equal(request.url, '/api/foos?active=true')
    })
  })
})
