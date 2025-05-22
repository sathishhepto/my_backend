'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Step 2: Reorder `createdAt` and `updatedAt` columns to the end
    await queryInterface.sequelize.query(`
      ALTER TABLE Users MODIFY createdAt DATETIME NOT NULL AFTER deleted_at;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE Users MODIFY updatedAt DATETIME NOT NULL AFTER createdAt;
    `);

  
  },

  down: async (queryInterface, Sequelize) => {
    console.log("Rollback not supported for column ordering.");
  },
};
