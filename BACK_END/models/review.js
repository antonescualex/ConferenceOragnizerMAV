const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

/**
 * Modelul Review
 * 
 * Descriere:
 * Reprezint o recenzie facuta de catre un reviewer pentru un articol.
 * 
 * Atribute:
 *  - decision: ENUM {"PENDING", "ACCEPT", "REJECT", "MODIFICATION_REQUIRED"} (decizia reviewerului)
 *              IMPLICIT: PENDING
 *  - comments: STRING | NULL (comentariile optionale facut de reviewer)
 * 
 * Relatii:
 *  - Review - Article (N:1)
 *  - Review - Reviewer (N:1)
 */
const Review = sequelize.define(
  "review",
  {
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
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["reviewerId", "articleId"],
      },
    ],
  }
);

module.exports = Review;
