'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify the 'roleId' column to be after 'phoneNumber'
    await queryInterface.sequelize.query(`
      ALTER TABLE Users 
      MODIFY COLUMN roleId INTEGER AFTER phoneNumber;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: Revert the 'roleId' column to its original position
    await queryInterface.sequelize.query(`
      ALTER TABLE Users 
      MODIFY COLUMN roleId INTEGER FIRST;
    `);
  },
};
