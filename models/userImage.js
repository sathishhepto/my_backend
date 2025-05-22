const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define User model
const UserImg = sequelize.define('userImg', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName: 'userimage', 
    timestamps: false,      
  });

module.exports = UserImg;
