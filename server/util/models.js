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
  Todo: db.define("todo", {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    content: DataTypes.TEXT,
  }),
  Pr: db.define("pr", {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    content: DataTypes.TEXT,
  }),
  Lift: db.define("lift", {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    content: DataTypes.TEXT,
  }),
  Thought: db.define("thought", {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    content: DataTypes.TEXT,
  }),
};
