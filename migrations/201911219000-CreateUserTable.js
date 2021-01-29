'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        username: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        firstname: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        lastname: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};