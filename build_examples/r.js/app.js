define('app', [
  'js-data',
  'js-data-http'
], function (JSData, DSHttpAdapter) {
  document.getElementById('main').innerHTML = DSHttpAdapter.version.full

  var adapter = new DSHttpAdapter()
  var Base = JSData.Model.extend({}, { name: 'Base' })
  Base.registerAdapter('http', adapter, { default: true })
  var User = Base.extend({}, { name: 'User' })

  User.find(1).catch(function (err) {
    console.log(err)
  })
})
