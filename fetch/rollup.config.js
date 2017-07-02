import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

export default {
  moduleName: 'JSDataHttp',
  amd: {
    id: 'js-data-fetch'
  },
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
