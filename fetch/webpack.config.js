var path= require('path')

module.exports = {
  entry: {
    './fetch/dist/js-data-fetch.js': './src/index.js',
    './fetch/dist/js-data-fetch-tests.js': './fetch/test/unit/index.js'
  },
  output: {
    filename: '[name]',
    libraryTarget: 'umd'
  },
  externals: [
    'js-data',
    {
      'axios': 'var undefined'
    },
    'chai'
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, 'test')
        ],
        test: /\.jsx?$/,
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['syntax-async-functions', 'transform-regenerator']
        }
      }
    ]
  }
}
