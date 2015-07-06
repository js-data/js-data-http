module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'js-data-http': '../../dist/js-data-http.js'
    }
  }
};
