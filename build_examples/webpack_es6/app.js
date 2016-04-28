import {DataStore} from 'js-data'
// normally this would be "import DSHttpAdatper from 'js-data-http'"
import HttpAdapter from '../../';

document.getElementById('main').innerHTML = HttpAdapter.version.full;

var adapter = new HttpAdapter()
var store = new DataStore()
store.registerAdapter('http', adapter, { default: true })
store.defineMapper('user')

store.find('user', 1).catch(function (err) {
  console.log(err)
})