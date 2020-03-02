const User = require('./user');
const Transaction = require('./transaction');
const Stock = require('./stock');

//make associations here
User.hasMany(Transaction);
Transaction.belongsTo(User);
User.hasMany(Stock);
Stock.belongsTo(User);

//export all models
module.exports = {
  User,
  Transaction,
  Stock,
};
