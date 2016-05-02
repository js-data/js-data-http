var path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    './node/dist/js-data-http-node.js': './src/index.js'
  },
  output: {
    filename: '[name]',
    libraryTarget: 'umd'
  },
  externals: [
    'js-data',
    'axios',
    'chai'
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
