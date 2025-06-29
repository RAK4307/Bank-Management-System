require('dotenv').config();
const mysql = require('mysql2');

// Safely get the password and remove quotes if they exist. Default to an empty string.
const dbPassword = (process.env.DB_PASSWORD || '').replace(/"/g, '');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: dbPassword,
  database: process.env.DB_NAME || 'bank_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();