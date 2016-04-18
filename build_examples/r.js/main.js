require.config({
  paths: {
    // customize these as needed
    'js-data-http': '../../node/dist/js-data-http',
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
