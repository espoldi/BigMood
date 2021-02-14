module.exports = (sequelize, DataTypes) => {
  const Mood = sequelize.define("Mood", {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [["excited", "happy", "neutral", "sad", "breakdown"]]
      }
    }
  }, {
    timestamps: false // disable createAt and updateAt
  }
  );

  Mood.associate = (models) => {
    Mood.hasMany(models.UserData, {
      foreignKey: "fk_mood",
      targetKey: "name"
    });
  };
  return Mood;
};
