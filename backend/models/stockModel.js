const db = require('../config/db');

// Get all stocks for a user
const getStocksByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM stocks WHERE user_id = ?', [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Add a new stock
const createStock = ({ user_id, symbol, quantity, purchasePrice }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO stocks (user_id, symbol, quantity, purchasePrice) VALUES (?, ?, ?, ?)',
      [user_id, symbol, quantity, purchasePrice],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, user_id, symbol, quantity, purchasePrice });
      }
    );
  });
};

// Delete a stock by ID
const deleteStock = (stockId, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM stocks WHERE id = ? AND user_id = ?',
      [stockId, userId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      }
    );
  });
};

// Update quantity of a stock
const updateStock = ({ stockId, userId, quantity }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE stocks SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, stockId, userId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      }
    );
  });
};

module.exports = {
  getStocksByUserId,
  createStock,
  deleteStock,
  updateStock
};
