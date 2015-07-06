require.config({
  paths: {
    'js-data-http': '../../dist/js-data-http',
    'js-data': '../../bower_components/js-data/dist/js-data',
    'axios': '../../bower_components/axios/dist/axios'
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
