const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  ticker: {
    type: Sequelize.STRING,
    allowNul: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNul: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNul: false,
  },
});

module.exports = Transaction;
