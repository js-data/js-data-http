var fs = require('fs')
var pkg = require('../package.json')

function banner (name, desc) {
  return '/*!\n' +
    '* js-data-' + name + '\n' +
    '* @version ' + pkg.version + ' - Homepage <http://www.js-data.io/docs/dshttpadapter>\n' +
    '* @author Jason Dobry <jason.dobry@gmail.com>\n' +
    '* @copyright (c) 2014-2016 Jason Dobry\n' +
    '* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>\n' +
    '*\n' +
    '* @overview ' + desc + '\n' +
    '*/\n'
}

console.log('Adding banner to dist/ files...')

function addBanner(name, desc, filepath) {
  var contents = fs.readFileSync(filepath, {
    encoding: 'utf-8'
  })
  if (contents.substr(0, 3) !== '/*!') {
    fs.writeFileSync(filepath, banner(name, desc) + contents, {
      encoding: 'utf-8'
    })
  }
}

var nodeDescription = 'Node.js HTTP adapter for js-data.'
var browserDescription = 'HTTP (XHR) adapter for js-data in the browser.'

addBanner('fetch', 'Fetch ' + browserDescription, 'fetch/dist/js-data-fetch.js')
addBanner('fetch', 'Fetch ' + browserDescription, 'fetch/dist/js-data-fetch.min.js')
addBanner('http-node', nodeDescription, 'node/dist/js-data-http-node.js')
addBanner('http', browserDescription, 'dist/js-data-http.js')
addBanner('http', browserDescription, 'dist/js-data-http.min.js')

console.log('Done!')
