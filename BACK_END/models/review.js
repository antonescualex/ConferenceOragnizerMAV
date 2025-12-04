const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Review = sequelize.define("review", {
    decision: {
        type: DataTypes.ENUM(
            "PENDING",
            "ACCEPT",
            "REJECT",
            "MODIFICATION_REQUIRED"
        ),
        defaultValue: "PENDING"
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true
    },
    grade: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
            max: 5
        }
    }
});

module.exports = Review;