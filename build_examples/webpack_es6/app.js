import {model} from 'js-data-'
// normally this would be "import DSHttpAdatper from 'js-data-http'"
import DSHttpAdapter from '../../';

document.getElementById('main').innerHTML = DSHttpAdapter.version.full;

const adapter = new DSHttpAdapter()
class Base extends JSData.Model {}
Base.registerAdapter('http', adapter, { default: true })
class User extends Base {}

User.find(1).catch(function (err) {
  console.log(err)
})