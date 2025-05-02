const db = require('../configs/db');

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

const createUser = (email, hashedPassword, role, callback) => {
  const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
  db.query(sql, [email, hashedPassword, role], callback);
};

module.exports = {
  findUserByEmail,
  createUser,
};
