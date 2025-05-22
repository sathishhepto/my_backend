'use strict';

const { deleteUser } = require("../controllers/userController");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserImage', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      deleteBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      
    });


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  },
};
