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
  externals: [
    'chai',
    'js-data'
  ],
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
