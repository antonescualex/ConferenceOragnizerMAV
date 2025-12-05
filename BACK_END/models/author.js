const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

/**
 * Modelul Author
 * 
 * Descriere:
 * Un autor poate scrie articole si poate sa trimita aceste articole
 * catre o conferinta.
 * 
 * Atribute:
 *  - fullName: STRING (numele complet al autorului)
 *  - email: STRING (adresa de email a autorului)
 *  - role: STRING (rolul autorului)
 * 
 * Relatii:
 *  - Author - Article (1:N)
 */
const Author = sequelize.define("author", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
});

module.exports = Author;