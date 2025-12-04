const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Organiser = sequelize.define("organiser", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
});

module.exports = Organiser;