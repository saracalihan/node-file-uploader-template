const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const files = sequelize.define('files', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  timestamps: true,
  paranoid: true,
  underscored: true,
});

const initialize = (models) => {
  models.files.belongsTo(models.users, {
    as: 'users',
    foreignKey: {
      name: 'user_id',
      allowNull: false,
    },
  });

}

module.exports = {
  model: files,
  initialize
}
