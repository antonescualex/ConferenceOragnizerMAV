const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

/**
 * Modelul Conference
 * 
 * Descriere:
 * Reprezint o conferinta in care sunt trimise articole.
 * 
 * Atribute:
 *  - name: STRING (numele conferintei)
 *  - description: STRING | NULL (descriere optionala)
 *  - startDate: DATE (data de inceput a conferintei)
 *  - endDate: DATE (data de final a conferintei)
 * 
 * Relatii:
 *  - Conference - Article (1:N)
 *  - Conference - Organiser (N:1)
 */
const Conference = sequelize.define("conference", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Conference;