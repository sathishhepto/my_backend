'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert predefined roles into the Roles table
    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'Superadmin',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Admin',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Customer',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted roles during rollback
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
