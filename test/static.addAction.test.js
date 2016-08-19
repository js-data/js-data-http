describe('static addAction', function () {
  it('should addAction', function (done) {
    var Test = this
    var SchoolMapper = Test.store.defineMapper('school', {})

    // GET async/reports/schools/:school_id/teachers
    Test.addAction('getTeacherReportsAsync', {
      basePath: 'async/',
      endpoint: 'reports/schools',
      pathname: 'teachers',
      method: 'GET'
    })(SchoolMapper)

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'text/plain' }, '')
    }, 5)

    SchoolMapper.getTeacherReportsAsync(1234).then(function (response) {
      Test.assert.equal(1, Test.requests.length)
      Test.assert.equal(Test.requests[0].url, 'async/reports/schools/1234/teachers', 'Add action configures basePath, endpoint and pathname')
      Test.assert.equal(Test.requests[0].method, 'GET')
      done()
    })
  })

  it('addAction action is callable with params instead of id', function (done) {
    var Test = this
    var adapter = Test.adapter
    var store = new Test.JSData.DataStore()
    store.registerAdapter('http', adapter, { default: true })
    var SchoolMapper = store.defineMapper('school', {})

    // GET async/reports/schools/teachers
    Test.addAction('getAllTeacherReportsAsync', {
      basePath: 'async/',
      endpoint: 'reports/schools',
      pathname: 'teachers',
      method: 'GET'
    })(SchoolMapper)

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'text/plain' }, '')
    }, 5)

    // GET async/reports/schools/teachers?<key>=<value>
    SchoolMapper.getAllTeacherReportsAsync({
      params: {
        subject: 'esperanto'
      }
    }).then(function (response) {
      Test.assert.equal(1, Test.requests.length)
      Test.assert.equal(Test.requests[0].url, 'async/reports/schools/teachers?subject=esperanto', 'Add action configures basePath, endpoint, pathname, and querystring')
      Test.assert.equal(Test.requests[0].method, 'GET')
      done()
    })
  })
})
