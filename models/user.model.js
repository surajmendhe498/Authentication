const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,  
    allowNull: false,  // You can set this to true if you want age to be optional
  },
}, {
  timestamps: false,
});

module.exports = User;
