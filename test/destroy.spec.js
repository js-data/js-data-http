describe('dsHttpAdapter#destroy', function () {
  it('should destroy a user from http', function (done) {
    var id;
    dsHttpAdapter.create(User, { name: 'John' })
      .then(function (user) {
        id = user.id;
        return dsHttpAdapter.destroy(User, user.id);
      })
      .then(function () {
        return dsHttpAdapter.find(User, id);
      })
      .then(function (destroyedUser) {
        assert.isFalse(!!destroyedUser);
        done();
      })
      .catch(done);
  });
});
