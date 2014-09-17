describe('dsHttpAdapter#create', function () {
  it('should create a user in http', function (done) {
    var id;
    dsHttpAdapter.create(User, { name: 'John' }).then(function (user) {
      id = user.id;
      assert.equal(user.name, 'John');
      assert.isString(user.id);
      return dsHttpAdapter.find(User, user.id);
    })
      .then(function (user) {
        assert.equal(user.name, 'John');
        assert.isString(user.id);
        assert.deepEqual(user, { id: id, name: 'John' });
        return dsHttpAdapter.destroy(User, user.id);
      })
      .then(function (destroyedUser) {
        assert.isFalse(!!destroyedUser);
        done();
      })
      .catch(done);
  });
});
