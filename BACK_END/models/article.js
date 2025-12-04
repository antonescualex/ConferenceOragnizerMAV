const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Article = sequelize.define("article", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            "SUBMITTED",
            "UNDER_REVIEW",
            "ACCEPTED",
            "REJECTED"
        ),
        defaultValue: "SUBMITTED"
    },
    version: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

module.exports = Article;