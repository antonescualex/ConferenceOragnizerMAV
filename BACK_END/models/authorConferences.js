const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const AuthorConference = sequelize.define("AuthorConference", {
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  conferenceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = AuthorConference;
