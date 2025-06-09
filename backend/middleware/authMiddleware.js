const jwt = require('jsonwebtoken');
const Stock = require('../models/stockModel');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Get all stocks
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user.id });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add more stock-related controllers (create, update, delete)

module.exports = {
  protect,
  getStocks,
  // export other controllers
};