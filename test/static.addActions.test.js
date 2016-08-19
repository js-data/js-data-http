describe('static addActions', function () {
  it('should addActions', function (done) {
    var Test = this
    var SchoolMapper = Test.store.defineMapper('school', {})

    // GET async/reports/schools/:school_id/teachers
    Test.addActions({
      getTeacherReports: {
        endpoint: 'reports/schools',
        pathname: 'teachers',
        method: 'GET'
      },
      getStudentReports: {
        endpoint: 'reports/schools',
        pathname: 'students',
        method: 'GET'
      }
    })(SchoolMapper)

    var asyncTestOne = function (nextTest) {
      setTimeout(function () {
        Test.requests[0].respond(200, { 'Content-Type': 'text/plain' }, '')
      }, 5)

      SchoolMapper.getTeacherReports(1234).then(function (response) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'reports/schools/1234/teachers', 'Add action configures basePath, endpoint and pathname')
        Test.assert.equal(Test.requests[0].method, 'GET')
        nextTest()
      })
    }

    var asyncTestTwo = function () {
      setTimeout(function () {
        Test.requests[1].respond(200, { 'Content-Type': 'text/plain' }, '')
      }, 5)

      SchoolMapper.getStudentReports(1234).then(function (response) {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url, 'reports/schools/1234/students', 'Add action configures basePath, endpoint and pathname')
        Test.assert.equal(Test.requests[1].method, 'GET')
        done()
      })
    }

    asyncTestOne(asyncTestTwo)
  })
})
