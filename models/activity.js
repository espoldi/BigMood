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
    },
    icon: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [[
          "chores_icon",
          "exercise_icon",
          "family_icon",
          "friends_icon",
          "games_icon",
          "home_icon",
          "meal_icon",
          "music_icon",
          "reading_icon",
          "travel_icon",
          "tv/movies_icon",
          "work_icon"
        ]]
      }
    }
  }, {
    timestamps: false // disable createAt and updateAt
  }
  );
  // Add associations
  Activity.associate = (models) => {
    // Associating Activity with UserData
    Activity.hasMany(models.UserData, {
      foreignKey: "fk_activity",
      targetKey: "name"
    });
  };
  return Activity;
};