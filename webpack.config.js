var path= require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    './dist/js-data-http.js': './src/index.js',
    './dist/js-data-http-tests.js': './test/unit/index.js'
  },
  output: {
    filename: '[name]',
    libraryTarget: 'umd',
    library: 'DSHttpAdapter'
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
          path.resolve(__dirname, 'src'),
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
