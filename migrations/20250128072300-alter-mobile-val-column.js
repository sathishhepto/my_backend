'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a unique constraint to the phoneNumber column
    await queryInterface.addConstraint('Users', {
      fields: ['phoneNumber'],
      type: 'unique',
      name: 'unique_phoneNumber_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint on the phoneNumber column
    await queryInterface.removeConstraint('Users', 'unique_phoneNumber_constraint');
  },
};
