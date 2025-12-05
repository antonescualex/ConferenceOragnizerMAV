const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

/**
 * Modelul Organiser
 * 
 * Descriere:
 * Un organizator poate creea conferinte.
 * 
 * Atribute:
 *  - fullName: STRING (numele complet al organizatorului)
 *  - email: STRING (adresa de email a organizatorului)
 *  - role: STRING (rolul organizatorului)
 * 
 * Relatii:
 *  - Oragniser - Conference (1:N)
 */
const Organiser = sequelize.define("organiser", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
});

module.exports = Organiser;