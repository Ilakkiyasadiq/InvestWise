const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Find user by email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Find user by ID
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id, name, email, balance FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Create a new user
const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (name, email, password, balance) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 10000],
      (err, result) => {
        if (err) return reject(err);
        resolve({
          id: result.insertId,
          name,
          email,
          balance: 10000
        });
      }
    );
  });
};

// Match user password
const matchPassword = async (inputPassword, storedHashedPassword) => {
  return bcrypt.compare(inputPassword, storedHashedPassword);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  matchPassword
};
