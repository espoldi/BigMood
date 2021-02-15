module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define("Theme", {
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "light",
      validate: {
        isIn: [["light", "dark", "red", "blue", "green"]]
      }
    }
  }, {
    timestamps: false // disable createAt and updateAt
  }
  );

  Theme.associate = (models) => {
    // Associating Theme with User
    Theme.hasMany(models.User, {
      foreignKey: "themeId",
      targetKey: "id",
      allowNull: false,
      defaultValue: 1
    });
  };

  return Theme;
};
