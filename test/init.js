var sequelize = require('../app/models/').sequelize;

sequelize.query("DELETE FROM Users").success(function() {
  console.log('Users is empty');
});
