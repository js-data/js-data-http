define('app', [
  'js-data',
  'js-data-http'
], function (JSData, HttpAdapter) {
  document.getElementById('main').innerHTML = HttpAdapter.version.full

  var adapter = new HttpAdapter()
  var store = new DataStore()
  store.registerAdapter('http', adapter, { default: true })
  store.defineMapper('user')

  store.find('user', 1).catch(function (err) {
    console.log(err)
  })
})
