
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Please provide username and password' });

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0 || results[0].password !== password)
      return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  });
});

module.exports = router;



//const { register, login } = require('../controllers/authController');
//router.post('/register', register);
//router.post('/login', login);


