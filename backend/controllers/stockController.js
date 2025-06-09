const Stock = require('../models/stockModel');

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.getStocksByUserId(req.user.id);
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addStock = async (req, res) => {
  try {
    const newStock = await Stock.createStock({
      user_id: req.user.id,
      ...req.body
    });
    res.status(201).json(newStock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// etc.
