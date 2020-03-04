const axios = require('axios');
const router = require('express').Router();
const { Transaction, Stock } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({
      where: {
        userId: req.user.id,
      },
    });
    const portfolioPromises = stocks.map(async stock => {
      const stockData = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${stock.ticker}/quote?token=${
          process.env.IEX_API
        }`
      );
      stock.dataValues.openingPrice = stockData.data.previousClose;
      stock.dataValues.currentPrice = stockData.data.latestPrice;
      return stock;
    });
    const portfolio = await Promise.all(portfolioPromises);
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  let { ticker, quantity } = req.body;
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
      await Transaction.create({
        userId: req.user.id,
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
        defaults: { quantity: quantity },
      });
      if (!newStock[1]) {
        newStock[0].quantity += quantity;
        await newStock[0].save();
      }
      req.user.update({ cash: req.user.cash - stockPrice * quantity });
      newStock[0].dataValues.currentPrice = stockPrice;
      newStock[0].dataValues.openingPrice = stockData.previousClose;
      res.json(newStock[0]);
    }
  } catch (err) {
    next(err);
  }
});
