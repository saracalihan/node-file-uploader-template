const Sequelize = require('sequelize');
const db_config = require('./configs/sequelize')[process.env.NODE_ENV];
require('dotenv').config();

const connection = new Sequelize(
  db_config.database,
  db_config.username,
  db_config.password,
  {
    host: db_config.host,
    dialect: db_config.dialect,
  },
);

connection.authenticate()
  .then(() => {
    console.log('MYSQL Connection done');
  }).catch((error) => console.log(error));

module.exports = connection;