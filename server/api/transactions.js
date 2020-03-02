const axios = require('axios');
const router = require('express').Router();
const { Transaction } = require('../db/models');
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
  let { ticker, quantity, type } = req.body;
  console.log('req.body:', req.body);
  quantity = +quantity;
  try {
    const stock = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${
        process.env.IEX_API
      }`
    );
    console.log('stock data:', stock.data);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
