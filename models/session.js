module.exports = function (sequelize, DataTypes) {
  const Session = sequelize.define('sessions', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.STRING
  }, {
    freezeTableName: true
  })
  return Session
}
