module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id       : DataTypes.INTEGER ,
    email    : DataTypes.STRING  ,
    passwd   : DataTypes.STRING  ,
    nickname : DataTypes.STRING  ,
    token    : DataTypes.STRING
  }, {
    instanceMethods: {
    }
  });
};
