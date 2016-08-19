describe('fetch', function () {
  it('should fetch from a URL', function (done) {
    var Test = this
    // Don't test fetch for Node
    try {
      fetch // eslint-disable-line
    } catch (e) {
      return this.skip()
    }
    if (Test.TEST_FETCH) {
      Test.xhr = Test.sinon.useFakeXMLHttpRequest()
      Test.requests = []
      Test.xhr.onCreate = function (xhr) {
        Test.requests.push(xhr)
      }
    }

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}')
    }, 300)

    Test.adapter.fetch({
      method: 'get',
      params: { active: true },
      url: '/api/foos'
    }).then(function (response) {
      var request = Test.requests[0]
      Test.assert.equal(request.method, 'GET')
      Test.assert.equal(request.url, '/api/foos?active=true')
      if (Test.TEST_FETCH) {
        Test.xhr.restore()
      }
      done()
    })
  })
})
