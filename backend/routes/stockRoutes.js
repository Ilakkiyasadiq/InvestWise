const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getStocks } = require('../controller/stockController');

router.get('/', protect, getStocks);
// Add more routes for stocks

module.exports = router;
