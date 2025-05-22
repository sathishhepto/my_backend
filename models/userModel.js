const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    phoneNumber: { 
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
    },
    roleId:{
        type: DataTypes.BIGINT,
        allowNull: true,
    }
});

module.exports = User;
