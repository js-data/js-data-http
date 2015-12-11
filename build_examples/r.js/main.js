require.config({
  paths: {
    // customize these ass needed
    'js-data-http': '../../node/dist/js-data-http-node',
    'js-data': '../../node_modules/js-data/dist/js-data',
  }
});

require([
    'app'
  ], function (User) {

    User.find(1).catch(function (err) {
      console.log(err);
    });
  }
);
