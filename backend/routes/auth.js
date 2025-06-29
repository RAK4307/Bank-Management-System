const express = require('express');
const router = express.Router();
const db = require('../db'); // Your DB connection (mysql2 or pg or sequelize, etc.)
const bcrypt = require('bcryptjs');

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return all user fields needed for dashboard
    res.json({
      message: 'Login successful',
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
        address: user.address,
        account_number: user.account_number,
        balance: user.balance // <-- Add this line
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    gender,
    account_type,
    address,
    password
  } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if user already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random 10-digit account number (ensure uniqueness in production)
    const account_number = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    // Insert user
    await db.query(
      `INSERT INTO users 
        (first_name, last_name, email, phone, gender, account_type, address, password, account_number) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone, gender, account_type, address, hashedPassword, account_number]
    );

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;