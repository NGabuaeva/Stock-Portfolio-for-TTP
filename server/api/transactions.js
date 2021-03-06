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
