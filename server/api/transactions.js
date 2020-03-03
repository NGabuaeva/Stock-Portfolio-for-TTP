const axios = require('axios');
const router = require('express').Router();
const { Transaction, Stock } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  let { ticker, quantity } = req.body;
  // console.log('req.user:', req.user)
  quantity = +quantity;
  try {
    const stock = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${
        process.env.IEX_API
      }`
    );
    const stockData = stock.data;
    const userCash = +req.user.cash;
    const stockPrice = +stockData.latestPrice;

    if (stockPrice * quantity > userCash) {
      throw new Error(
        "You don't have enough money on your account for this purchase"
      );
    } else {
      const newTransaction = await Transaction.create({
        type: 'BUY',
        ticker: ticker,
        quantity: quantity,
        price: stockPrice,
      });
      const newStock = await Stock.findOrCreate({
        where: {
          userId: req.user.id,
          ticker: ticker,
        },
        defaults: { quantity: quantity, price: stockPrice },
      });
      if (!newStock[1]) {
        newStock[0].quantity += quantity;
        await newStock[0].save();
      }
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});
