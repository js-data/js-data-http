import JSData from 'js-data';
import axios from 'axios';
// normally this would be import DSHttpAdatper from 'js-data-http';
import DSHttpAdapter from '../../';

document.getElementById('main').innerHTML = JSData.version.full;

let adapter = new DSHttpAdapter({
  http: axios
});
let store = new JSData.DS();
store.registerAdapter('http', adapter, { default: true });
let User = store.defineResource('user');

User.find(1).catch(err => {
  console.log(err);
});
