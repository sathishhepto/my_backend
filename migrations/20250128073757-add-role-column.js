'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the roleId column after the phoneNumber column
    await queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust based on your requirements (true/false)
    }, {
      after: 'phoneNumber', // Position the new column after the phoneNumber column
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the roleId column if rolling back the migration
    await queryInterface.removeColumn('Users', 'roleId');
  },
};
