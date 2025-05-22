'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'verified', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1, // Fixed default value syntax
    });

    await queryInterface.addColumn('Users', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'deleted_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'verified');
    await queryInterface.removeColumn('Users', 'created_by');
    await queryInterface.removeColumn('Users', 'deleted_by');
    await queryInterface.removeColumn('Users', 'deleted_at');
  },
};
