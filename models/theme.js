module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define("Theme", {
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "gray",
      validate: {
        isIn: [["gray", "black", "red", "blue", "green"]]
      }
    }
  }, {
    timestamps: false // disable createAt and updateAt
  }
  );

  // Add associations
  Theme.associate = (models) => {
    // Associating Theme with User
    Theme.hasMany(models.User, {
      onDelete: "cascade"
    });
  };

  return Theme;
};
