const User = require('./user');
const Transaction = require('./transaction');

//make associations here
User.hasMany(Transaction);
Transaction.belongsTo(User);
//export all models
module.exports = {
  User,
  Transaction,
};
