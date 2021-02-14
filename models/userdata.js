module.exports = (sequelize, DataTypes) => {
  const UserData = sequelize.define("UserData", {
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        isNumeric: true
      }
    }
  });


  UserData.associate = (models) => {
    // Associating UserData with Mood, Activity and User
    UserData.belongsTo(models.Mood, {
      foreignKey: "fk_mood",
      targetKey: "name"
    });
    UserData.belongsTo(models.Activity, {
      foreignKey: "fk_activity",
      targetKey: "name"
    });
    UserData.belongsTo(models.User, {
      foreignKey: "fk_user",
      targetKey: "email"
    });
  };

  return UserData;
};
