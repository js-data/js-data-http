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
  }
};
