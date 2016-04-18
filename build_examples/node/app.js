var JSData = require('js-data')
// normally this would be "var HttpAdapter = require('js-data-http-node')"
var HttpAdapter = require('../../')

var adapter = new HttpAdapter()
var store = new JSData.Container()
store.registerAdapter('http', adapter, { default: true })
store.defineMapper('user')

store.find('user', 1).catch(function (err) {
  console.log(err)
})
