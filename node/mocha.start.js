'use strict'

var querystring = require('querystring')

before(function () {
  var Test = this
  Test.fail = function (msg) {
    if (msg instanceof Error) {
      console.log(msg.stack)
    } else {
      Test.assert.equal('should not reach this!: ' + msg, 'failure')
    }
  }
  Test.assert = require('chai').assert
  Test.assert.objectsEqual = function (a, b, m) {
    Test.assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m || (JSON.stringify(a) + ' should be equal to ' + JSON.stringify(b)))
  }
  Test.sinon = require('sinon')
  Test.JSData = require('js-data')
  Test.HttpAdapter = require('./dist/js-data-http-node').HttpAdapter
  Test.User = new Test.JSData.Mapper({
    name: 'user'
  })
  Test.Post = new Test.JSData.Mapper({
    name: 'post',
    endpoint: 'posts',
    basePath: 'api'
  })

  console.log('Testing against js-data ' + Test.JSData.version.full)
})

beforeEach(function () {
  var Test = this
  Test.adapter = new Test.HttpAdapter()
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
    var params = 0
    for (var key in config.params) {
      config.params[key] = Test.JSData.utils.isObject(config.params[key]) ? JSON.stringify(config.params[key]) : config.params[key]
      params++
    }
    return new Promise(function (resolve) {
      var url = config.url
      if (params) {
        url += '?'
        url += querystring.stringify(config.params)
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
