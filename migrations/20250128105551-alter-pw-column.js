'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, add the column to the table
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.INTEGER,
      allowNull: true, 
    });

    // Then, reorder the column using a raw query
    await queryInterface.sequelize.query(`
      ALTER TABLE Users 
      MODIFY COLUMN password INTEGER NULL 
      AFTER roleId;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'password' column
    await queryInterface.removeColumn('Users', 'password');
  },
};
