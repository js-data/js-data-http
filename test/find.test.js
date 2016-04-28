describe('find', function () {
  it('should find', function () {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
    }, 30)

    return Test.adapter.find(Test.Post, 1)
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts/1')
        Test.assert.equal(Test.requests[0].method, 'GET')
        Test.assert.deepEqual(data, Test.p1, 'post should have been found')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
        }, 30)

        return Test.adapter.find(Test.Post, 1, { basePath: 'api2' })
      })
      .then(function (data) {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url, 'api2/posts/1')
        Test.assert.equal(Test.requests[1].method, 'GET')
        Test.assert.deepEqual(data, Test.p1, 'post should have been found')
      })
  })

  it('should use default configs', function () {
    var Test = this

    Test.adapter.httpConfig.params = { test: 'test' }
    Test.adapter.httpConfig.headers = { Authorization: 'test' }

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
    }, 30)

    return Test.adapter.find(Test.Post, 1)
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts/1?test=test')
        Test.assert.equal(Test.requests[0].method, 'GET')
        Test.assert.deepEqual({
          Authorization: 'test',
          Accept: 'application/json, text/plain, */*'
        }, Test.requests[0].requestHeaders)
        Test.assert.deepEqual(data, Test.p1, 'post should have been found')

        delete Test.adapter.httpConfig.params
        delete Test.adapter.httpConfig.headers
      })
  })

  it('should log errors', function () {
    var Test = this
    var loggedError

    Test.adapter.error = function (err) {
      loggedError = err
    }

    setTimeout(function () {
      Test.requests[0].respond(404, { 'Content-Type': 'text/plain' }, 'Not Found')
    }, 30)

    return Test.adapter.find(Test.Post, 1)
      .then(function () {
        throw new Error('Should not have succeeded!')
      }, function () {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts/1')
        Test.assert.equal(Test.requests[0].method, 'GET')
        Test.assert.isString(loggedError)
        Test.assert.isTrue(loggedError.indexOf('api/posts/1') !== -1)
      })
  })

  it('should use suffixes', function () {
    var Test = this

    var Thing = new Test.JSData.Mapper({
      name: 'thing',
      endpoint: 'things',
      suffix: '.xml'
    })

    var otherAdapter = new Test.HttpAdapter({
      suffix: '.json'
    })
    otherAdapter.http = Test.adapter.http

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ id: 1 }))
    }, 30)

    return Test.adapter.find(Thing, 1)
      .then(function () {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'things/1.xml')
        Test.assert.equal(Test.requests[0].method, 'GET')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ id: 1 }))
        }, 30)

        return otherAdapter.find(Test.Post, 1)
      }).then(function () {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url, 'api/posts/1.json')
        Test.assert.equal(Test.requests[1].method, 'GET')
      })
  })

  it('should work with multiple parents', function () {
    var Test = this
    var store = new Test.JSData.DataStore({
      mapperDefaults: {
        basePath: 'api'
      }
    })
    store.registerAdapter('http', Test.adapter, { default: true })
    store.defineMapper('user', {
      relations: {
        hasMany: {
          post: {
            foreignKey: 'userId',
            localField: 'posts'
          },
          comment: {
            foreignKey: 'userId',
            localField: 'comments'
          }
        }
      }
    })
    store.defineMapper('post', {
      endpoint: 'posts',
      relations: {
        belongsTo: {
          user: {
            parent: true,
            foreignKey: 'userId',
            localField: 'user'
          }
        },
        hasMany: {
          comment: {
            localField: 'comments',
            foreignKey: 'postId'
          }
        }
      }
    })
    store.defineMapper('comment', {
      relations: {
        belongsTo: {
          post: {
            parent: true,
            foreignKey: 'postId',
            localField: 'post'
          },
          user: {
            parent: true,
            foreignKey: 'userId',
            localField: 'user'
          }
        }
      }
    })

    var post = {
      id: 1,
      userId: 10
    }

    var comment = {
      id: 3,
      postId: 1,
      userId: 13
    }

    var comment2 = {
      id: 4,
      userId: 7
    }

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(post))
    }, 30)

    return store.find('post', 1, { params: { userId: 10 } })
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/user/10/posts/1')
        Test.assert.equal(Test.requests[0].method, 'GET')
        Test.assert.objectsEqual(data, post, 'post should have been found')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(comment))
        }, 30)

        return store.find('comment', 3, { params: { postId: 1, userId: 13 } })
      })
      .then(function (data) {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url, 'api/user/13/posts/1/comment/3')
        Test.assert.equal(Test.requests[1].method, 'GET')
        Test.assert.objectsEqual(data, comment, 'comment should have been found')

        setTimeout(function () {
          Test.requests[2].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(comment2))
        }, 30)

        return store.find('comment', 4, { params: { userId: 7 } })
      })
      .then(function (data) {
        Test.assert.equal(3, Test.requests.length)
        Test.assert.equal(Test.requests[2].url, 'api/user/7/comment/4')
        Test.assert.equal(Test.requests[2].method, 'GET')
        Test.assert.objectsEqual(data, comment2, 'comment should have been found')
      })
  })
})
