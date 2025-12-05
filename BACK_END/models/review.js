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
 *  - grade: FLOAT (nota alocata intre 1 si 5)
 *           INTERVAL PERMIS: 0 - 5
 * 
 * Relatii:
 *  - Review - Article (N:1)
 *  - Review - Reviewer (N:1)
 */
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