const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.STRING,
    allowNul: false,
  },
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

module.exports = Transaction;
