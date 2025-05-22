'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'phoneNumber', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
  },
};


