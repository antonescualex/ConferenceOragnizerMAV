const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const ConferenceReviewer = sequelize.define("ConferenceReviewer", {
  conferenceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reviewerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ConferenceReviewer;
