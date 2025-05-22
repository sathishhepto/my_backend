const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define User model
const Roles = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
});

module.exports = Roles;
