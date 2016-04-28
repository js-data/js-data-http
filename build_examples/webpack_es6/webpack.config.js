var path = require('path');
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  // only necessary for this demo
  resolve: {
    alias: {
      'js-data-http': '../../dist/js-data-http.js'
    }
  },
  module: {
    loaders: [
      {test: /(.+)\.js$/, loader: 'babel-loader?blacklist=useStrict'}
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, '../../node_modules')
  }
};
