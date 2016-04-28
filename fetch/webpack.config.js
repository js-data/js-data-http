var path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    './fetch/dist/js-data-fetch.js': './src/index.js'
  },
  output: {
    filename: '[name]',
    libraryTarget: 'umd',
    library: 'JSDataHttp'
  },
  externals: [
    {
      'js-data': {
        amd: 'js-data',
        commonjs: 'js-data',
        commonjs2: 'js-data',
        root: 'JSData'
      }
    },
    {
      'axios': 'var undefined'
    },
    {
      'chai': {
        amd: 'chai',
        commonjs: 'chai',
        commonjs2: 'chai',
        root: 'chai'
      }
    }
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src')
        ],
        test: /\.js$/
      }
    ]
  }
}
