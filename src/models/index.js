const fs = require('fs');
const sequelize = require('../sequelize');

const models = {};
const init_callbacks = [];

fs
  .readdirSync(__dirname)
  .filter((file) => ((file.indexOf('.') !== 0) && (file !== 'index.js')))
  .forEach((file) => {
    const { model, initialize} = require('./' + file); // eslint-disable-line
    models[model.name] = model;
    init_callbacks.push(initialize);
  });

init_callbacks.forEach((initialize) => {
  initialize(models);
});
console.log(models);
module.exports =  models;

