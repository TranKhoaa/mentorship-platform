const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  User.findUserByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Hashing error' });

      User.createUser(email, hashedPassword, role, (err, result) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  User.findUserByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (result.length === 0) {
      return res.status(400).json({ message: 'Email does not exists, please try again!' });
    }

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords' });
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password, please try again!' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
    });
  });
};

module.exports = {
  register,
  login,
};
