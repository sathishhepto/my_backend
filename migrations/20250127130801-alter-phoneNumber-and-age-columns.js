'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify the 'phoneNumber' column to be NOT NULL using raw query
    await queryInterface.sequelize.query(`
      ALTER TABLE Users 
      CHANGE COLUMN phoneNumber phoneNumber VARCHAR(255) NOT NULL AFTER age;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: If necessary, revert the change (set phoneNumber back to NULL and move it to its original position)
    await queryInterface.sequelize.query(`
      ALTER TABLE Users 
      CHANGE COLUMN phoneNumber phoneNumber VARCHAR(255) NULL AFTER email;
    `);
  },
};
