module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [[
          "chores",
          "exercise",
          "family",
          "friends",
          "games",
          "home",
          "meal",
          "music",
          "reading",
          "travel",
          "tv/movies",
          "work"
        ]]
      }
    }
  }, {
    timestamps: false // disable createAt and updateAt
  }
  );

  Activity.associate = (models) => {
    Activity.hasMany(models.UserData, {
      foreignKey: "fk_activity",
      targetKey: "name"
    });
  };
  return Activity;
};