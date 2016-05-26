describe('update', function () {
  it('should update', function () {
    var Test = this

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
    }, 30)

    return Test.adapter.update(Test.Post, 1, { author: 'John', age: 30 })
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'api/posts/1')
        Test.assert.equal(Test.requests[0].method, 'PUT')
        Test.assert.equal(Test.requests[0].requestBody, JSON.stringify({ author: 'John', age: 30 }))
        Test.assert.deepEqual(data, Test.p1, 'post 5 should have been updated')

        setTimeout(function () {
          Test.requests[1].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(Test.p1))
        }, 30)

        return Test.adapter.update(Test.Post, 1, { author: 'John', age: 30 }, { basePath: 'api2' })
      })
      .then(function (data) {
        Test.assert.equal(2, Test.requests.length)
        Test.assert.equal(Test.requests[1].url, 'api2/posts/1')
        Test.assert.equal(Test.requests[1].method, 'PUT')
        Test.assert.equal(Test.requests[1].requestBody, JSON.stringify({ author: 'John', age: 30 }))
        Test.assert.deepEqual(data, Test.p1, 'post 5 should have been updated')
      })
  })
  it('should send nested relations', function () {
    var Test = this
    var JSData = Test.JSData
    var store = new JSData.Container()
    store.registerAdapter('http', Test.adapter, { default: true })
    store.defineMapper('user', {
      relations: {
        hasMany: {
          post: {
            localField: 'posts',
            foreignKey: 'userId'
          },
          address: {
            localField: 'addresses',
            foreignKey: 'userId'
          }
        }
      }
    })
    store.defineMapper('post', {
      relations: {
        belongsTo: {
          user: {
            localField: 'user',
            foreignKey: 'userId'
          }
        }
      }
    })
    store.defineMapper('address', {
      relations: {
        belongsTo: {
          user: {
            localField: 'user',
            foreignKey: 'userId'
          }
        }
      }
    })

    setTimeout(function () {
      Test.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({
        id: 1,
        posts: [
          {
            id: 2,
            userId: 1
          }
        ]
      }))
    }, 30)

    return store.update('user', 1, {
      id: 1,
      posts: [
        {
          id: 2,
          userId: 1
        }
      ],
      addresses: [
        {
          id: 3,
          userId: 1
        }
      ]
    }, { with: ['posts'] })
      .then(function (data) {
        Test.assert.equal(1, Test.requests.length)
        Test.assert.equal(Test.requests[0].url, 'user/1')
        Test.assert.equal(Test.requests[0].method, 'PUT')
        Test.assert.equal(Test.requests[0].requestBody, JSON.stringify({
          id: 1,
          posts: [
            {
              id: 2,
              userId: 1
            }
          ]
        }))
        Test.assert.deepEqual(data, {
          id: 1,
          posts: [
            {
              id: 2,
              userId: 1
            }
          ]
        })
      })
  })
})
