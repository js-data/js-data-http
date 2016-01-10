/* global JSData:true, DSHttpAdapter:true, sinon:true, chai:true */
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
  Test.sinon = sinon
  Test.JSData = JSData
  Test.DSHttpAdapter = DSHttpAdapter
  Test.User = JSData.Model.extend({}, {
    name: 'user'
  })
  Test.Post = JSData.Model.extend({}, {
    name: 'post',
    endpoint: 'posts',
    basePath: 'api'
  })

  console.log('Testing against js-data ' + JSData.version.full)
})

beforeEach(function () {
  var Test = this
  Test.adapter = new DSHttpAdapter()
  Test.User.registerAdapter('http', Test.adapter, { default: true })
  Test.Post.registerAdapter('http', Test.adapter, { default: true })

  Test.p1 = { author: 'John', age: 30, id: 5 }
  Test.p2 = { author: 'Sally', age: 31, id: 6 }
  Test.p3 = { author: 'Mike', age: 32, id: 7 }
  Test.p4 = { author: 'Adam', age: 33, id: 8 }
  Test.p5 = { author: 'Adam', age: 33, id: 9 }

  Test.requests = []

  Test.adapter.http = function (config) {
    config.headers || (config.headers = {})
    config.headers.Accept = 'application/json, text/plain, */*'
    var params = []
    for (var key in config.params) {
      config.params[key] = Test.JSData.utils.isObject(config.params[key]) ? JSON.stringify(config.params[key]) : config.params[key]
      params.push([key, config.params[key]])
    }
    return new Promise(function (resolve) {
      var url = config.url
      if (params.length) {
        url += '?'
        params.forEach(function (param) {
          url += param[0]
          url += '='
          url += encodeURIComponent(param[1])
        })
      }
      var request = {
        url: url,
        method: config.method,
        requestBody: JSON.stringify(config.data),
        requestHeaders: config.headers,
        respond: function (statusCode, headers, body) {
          resolve({
            url: config.url,
            method: config.method,
            status: statusCode,
            headers: headers,
            data: body && statusCode >= 200 && statusCode < 300 ? JSON.parse(body) : ''
          })
        }
      }
      Test.requests.push(request)
    })
  }
})
