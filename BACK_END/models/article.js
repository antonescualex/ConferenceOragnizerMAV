const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

/**
 * Modelul Article
 * 
 * Descriere:
 * Reprezinta un articol scris de un autor si trimis
 * la o conferinta.
 * 
 * Atribute:
 *  - title: STRING (titlul articolului)
 *  - status: ENUM{ "SUBMITTED", "UNDER_REVIEW", "ACCEPTED", "REJECTED" }
 *            IMPLICIT: "SUBMITTED"
 *  - version: INT (versiunea articolului)
 *            IMPLICIT: 1
 * 
 * Relatii:
 *  - Article - Author (N:1)
 *  - Article - Conference (N:1)
 *  - Article - Review (1:N)
 */
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