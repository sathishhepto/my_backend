'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Modify the 'createdAt' column to have the current timestamp as default
    await queryInterface.changeColumn('Roles', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
      allowNull: false, // Ensure the field is not nullable
    });

    // Modify the 'updatedAt' column to have the current timestamp as default
    await queryInterface.changeColumn('Roles', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
      allowNull: false, // Ensure the field is not nullable
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert to the previous types (if needed)
    await queryInterface.changeColumn('Roles', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true, // Revert the 'createdAt' field to be nullable if necessary
    });

    await queryInterface.changeColumn('Roles', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true, // Revert the 'updatedAt' field to be nullable if necessary
    });
  }
};
