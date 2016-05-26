var babel = require('rollup-plugin-babel')
var replace = require('rollup-plugin-replace')

module.exports = {
  moduleName: 'JSDataHttp',
  moduleId: 'js-data-fetch',
  external: [
    'js-data'
  ],
  globals: {
    'js-data': 'JSData'
  },
  plugins: [
    replace({
      'import axios from \'../node_modules/axios/dist/axios\'': 'var axios = undefined'
    }),
    babel({
      babelrc: false,
      presets: [
        'es2015-rollup'
      ]
    })
  ]
}
