const { DataTypes } = require("sequelize");
const db = require("./database");

module.exports = {
  User: db.define("user", {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
};
