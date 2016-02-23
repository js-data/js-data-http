/* global JSData:true, HttpAdapter:true, sinon:true, chai:true */
before(function () {
  var Test = this
  Test.fail = function (msg) {
    if (msg instanceof Error) {
      console.log(msg.stack)
    } else {
      Test.assert.equal('should not reach this!: ' + msg, 'failure')
    }
  }
  Test.assert = chai.assert
  Test.assert.objectsEqual = function (a, b, m) {
    Test.assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
  }
  Test.sinon = sinon
  Test.JSData = JSData
  Test.HttpAdapter = HttpAdapter
  Test.User = new JSData.Mapper({
    name: 'user'
  })
  Test.Post = new JSData.Mapper({
    name: 'post',
    endpoint: 'posts',
    basePath: 'api'
  })

  console.log('Testing against js-data ' + JSData.version.full)
})

beforeEach(function () {
  var Test = this
  Test.adapter = new HttpAdapter()
  Test.User.registerAdapter('http', Test.adapter, { default: true })
  Test.Post.registerAdapter('http', Test.adapter, { default: true })

  Test.p1 = { author: 'John', age: 30, id: 5 }
  Test.p2 = { author: 'Sally', age: 31, id: 6 }
  Test.p3 = { author: 'Mike', age: 32, id: 7 }
  Test.p4 = { author: 'Adam', age: 33, id: 8 }
  Test.p5 = { author: 'Adam', age: 33, id: 9 }

  try {
    Test.xhr = Test.sinon.useFakeXMLHttpRequest()
    // Create an array to store requests
    Test.requests = []
    // Keep references to created requests
    Test.xhr.onCreate = function (xhr) {
      Test.requests.push(xhr)
    }
  } catch (err) {
    console.error(err)
  }
})

afterEach(function () {
  var Test = this
  // Restore the global timer functions to their native implementations
  try {
    Test.xhr.restore()
  } catch (err) {
    console.error(err)
  }
})
