const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  ticker: {
    type: Sequelize.STRING,
    allowNul: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNul: false,
  },
  openingPrice: {
    type: Sequelize.INTEGER,
    allowNul: false,
  },
});

module.exports = Stock;
