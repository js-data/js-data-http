var path= require('path')

module.exports = {
  entry: {
    './node/dist/js-data-http-node.js': './src/index.js',
    './node/dist/js-data-http-node-tests.js': './node/test/unit/index.js'
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
