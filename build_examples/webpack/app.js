var JSData = require('js-data');
var axios = require('axios');
// normally this would be var DSHttpAdapter = require('js-data-http');
var DSHttpAdapter = require('../../');

document.getElementById('main').innerHTML = JSData.version.full;

var adapter = new DSHttpAdapter({
  http: axios
});
var store = new JSData.DS();
store.registerAdapter('http', adapter, { default: true });
var User = store.defineResource('user');

User.find(1).catch(function (err) {
  console.log(err);
});
