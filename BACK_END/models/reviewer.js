const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

/**
 * Modelul Reviewer
 * 
 * Descriere:
 * Un reviewer poate scrie si aloca review-uri unor articole
 * catre o conferinta.
 * 
 * Atribute:
 *  - fullName: STRING (numele complet al reviewer-ului)
 *  - email: STRING (adresa de email a reviewer-ului)
 *  - role: STRING (rolul reviewer-ului)
 * 
 * Relatii:
 *  - Reviewer - Review (1:N)
 */
const Reviewer = sequelize.define("reviewer", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
});

module.exports = Reviewer;