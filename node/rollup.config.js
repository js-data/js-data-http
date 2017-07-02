import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

export default {
  moduleName: 'JSDataHttpNode',
  amd: {
    id: 'js-data-http-node'
  },
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
      plugins: [
        'external-helpers'
      ],
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ]
      ],
      exclude: 'node_modules/axios/**'
    })
  ]
}
