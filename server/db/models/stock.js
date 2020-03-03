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
  price: {
    type: Sequelize.DECIMAL,
    allowNul: false,
  },
});

module.exports = Stock;
