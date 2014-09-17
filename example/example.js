(function () {
  var dsHttpAdapter = new DSHttpAdapter();

  var datastore = new JSData.DS();
  datastore.defaults.defaultAdapter = 'dsHttpAdapter';
  datastore.adapters.dsHttpAdapter = dsHttpAdapter;

  var User = datastore.defineResource('user');

  angular.module('http-example', [])
    .controller('httpCtrl', function ($scope, $timeout) {
      $scope.add = function (user) {
        $scope.creating = true;
        User.create(user).then(function () {
          $scope.creating = false;
          $timeout();
        }, function () {
          $scope.creating = false;
        });
      };
      $scope.remove = function (user) {
        $scope.destroying = user.id;
        User.destroy(user.id).then(function () {
          delete $scope.destroying;
          $timeout();
        }, function () {
          delete $scope.destroying;
        });
      };
      $scope.$watch(function () {
        return User.lastModified();
      }, function () {
        $scope.users = User.filter();
      });
    });
})();
