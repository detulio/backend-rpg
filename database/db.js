const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:qwe123%21%40%23@localhost:5432/game', {dialect: 'postgres'});

module.exports = sequelize;