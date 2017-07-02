import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  moduleName: 'JSDataHttp',
  amd: {
    id: 'js-data-http'
  },
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
