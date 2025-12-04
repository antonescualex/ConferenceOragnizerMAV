const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Reviewer = sequelize.define("reviewer", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
});

module.exports = Reviewer;