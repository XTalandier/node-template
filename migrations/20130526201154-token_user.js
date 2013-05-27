module.exports = {
  up: function(migration, DataTypes , done) {
    migration.addColumn(
      'Users',
      'token',
      DataTypes.STRING
    );
    done();
  },
  down: function(migration, DataTypes , done) {
    migration.removeColumn('Users' , 'token');
    done();
  }
}