var fs = require('fs')
var pkg = require('../package.json')

var banner = '/*!\n' +
  '* js-data-http\n' +
  '* @version ' + pkg.version + ' - Homepage <https://github.com/js-data/js-data-http>\n' +
  '* @copyright (c) 2014-2016 js-data-http project authors\n' +
  '* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>\n' +
  '*\n' +
  '* @overview HTTP (XHR) adapter for js-data in the browser.\n' +
  '*/\n'

console.log('Adding banner to dist/ files...')

function addBanner (filepath) {
  var contents = fs.readFileSync(filepath, {
    encoding: 'utf-8'
  })
  if (contents.substr(0, 3) !== '/*!') {
    fs.writeFileSync(filepath, banner + contents, {
      encoding: 'utf-8'
    })
  }
}

addBanner('dist/js-data-http.js')
addBanner('dist/js-data-http.min.js')

banner = '/*!\n' +
  '* js-data-fetch\n' +
  '* @version ' + pkg.version + ' - Homepage <https://github.com/js-data/js-data-http>\n' +
  '* @copyright (c) 2014-2016 js-data-http project authors\n' +
  '* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>\n' +
  '*\n' +
  '* @overview HTTP adapter for js-data that uses the fetch API.\n' +
  '*/\n'

addBanner('fetch/dist/js-data-fetch.js')
addBanner('fetch/dist/js-data-fetch.min.js')

console.log('Done!')
