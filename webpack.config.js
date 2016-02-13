var path= require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    './dist/js-data-http.js': './src/index.js'
  },
  output: {
    filename: '[name]',
    libraryTarget: 'umd',
    library: 'HttpAdapter'
  },
  externals: {
    'chai': {
      amd: 'chai',
      commonjs: 'chai',
      commonjs2: 'chai',
      root: 'chai'
    },
    'js-data': {
      amd: 'js-data',
      commonjs: 'js-data',
      commonjs2: 'js-data',
      root: 'JSData'
    }
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.js$/
      }
    ]
  }
}
