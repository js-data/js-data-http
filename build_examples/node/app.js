var Promise = require('es6-promise');
var JSData = require('js-data');
var axios = require('axios');
var DSHttpAdapter = require('../../');

var adapter = new DSHttpAdapter({
  http: axios
});
var store = new JSData.DS();
store.registerAdapter('http', adapter, { default: true });
var User = store.defineResource('user');

User.find(1).catch(function (err) {
  console.log(err);
});
