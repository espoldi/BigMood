module.exports = (sequelize, DataTypes) => {
  const Mood = sequelize.define("Mood", {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [["excited", "happy", "neutral", "sad", "breakdown"]]
      }
    },
    icon: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [["excited_icon", "happy_icon", "neutral_icon", "sad_icon", "breakdown_icon"]]
      }
    }
  }, {
    timestamps: false // disable createAt and updateAt
  }
  );
  // Add associations
  Mood.associate = (models) => {
    // Associating Mood with UserData
    Mood.hasMany(models.UserData, {
      foreignKey: "fk_mood",
      targetKey: "name"
    });
  };
  return Mood;
};
