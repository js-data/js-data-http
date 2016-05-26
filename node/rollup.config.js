var babel = require('rollup-plugin-babel')
var replace = require('rollup-plugin-replace')

module.exports = {
  moduleName: 'JSDataHttpNode',
  moduleId: 'js-data-http-node',
  external: [
    'axios',
    'js-data',
    'js-data-adapter'
  ],
  globals: {
    'axios': 'axios',
    'js-data': 'JSData',
    'js-data-adapter': 'JSDataAdapter'
  },
  plugins: [
    replace({
      'import axios from \'../node_modules/axios/dist/axios\'': 'var axios = require(\'axios\')',
      '\'../node_modules/js-data-adapter/src/index\'': '\'js-data-adapter\''
    }),
    babel({
      babelrc: false,
      presets: [
        'es2015-rollup'
      ]
    })
  ]
}
