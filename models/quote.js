module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define("Quote", {
    author: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [1, 30]
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250]
      },
    }
  }, {
    timestamps: false // disable createAt and updateAt
  }
  );

  return Quote;
};
