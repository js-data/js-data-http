var babel = require('rollup-plugin-babel')
var commonjs = require('rollup-plugin-commonjs')

module.exports = {
  moduleName: 'JSDataHttp',
  moduleId: 'js-data-http',
  external: [
    'js-data'
  ],
  globals: {
    'js-data': 'JSData'
  },
  plugins: [
    commonjs({
      include: 'node_modules/axios/**'
    }),
    babel({
      babelrc: false,
      presets: [
        'es2015-rollup'
      ],
      exclude: 'node_modules/axios/**'
    })
  ]
}
