define('app', [
  'js-data',
  'axios',
  'js-data-http'
], function (JSData, axios, DSHttpAdapter) {
  document.getElementById('main').innerHTML = JSData.version.full;

  var adapter = new DSHttpAdapter({
    http: axios
  });
  var store = new JSData.DS();
  store.registerAdapter('http', adapter, { default: true });
  return store.defineResource('user');
});
