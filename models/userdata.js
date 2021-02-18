// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, DataTypes) => {
  const UserData = sequelize.define("UserData", {});

  // Add associations
  UserData.associate = (models) => {
    // Associating UserData with Mood, Activity and User
    UserData.belongsTo(models.User, {
      foreignKey: "fk_user",
      targetKey: "email"
    });
    UserData.belongsTo(models.Mood, {
      foreignKey: "fk_mood",
      targetKey: "id"
    });
    UserData.belongsTo(models.Activity, {
      foreignKey: "fk_activity",
      targetKey: "id"
    });
  };

  return UserData;
};
