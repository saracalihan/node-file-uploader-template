const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const users = sequelize.define('users',{
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  timestamps: true,
  paranoid: true,
  underscored: true,
});

const initialize = (models) => {}

module.exports = {
  model: users,
  initialize
}
