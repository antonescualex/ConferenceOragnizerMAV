const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Author = sequelize.define("author", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
});

module.exports = Author;