const bcrypt = require('bcrypt');
const db = require('../db');
const mysql = require('mysql2');

const createAdmin = async () => {
  const email = 'ranil777@gmail.com';
  const password = 'ranil1234';

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
      'INSERT INTO admins (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    console.log(`✅ Admin user created successfully with ID: ${result.insertId}`);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('❌ Error: Admin user with this email already exists.');
    } else {
      console.error('❌ Error creating admin user:', error);
    }
  }
  process.exit();
};

createAdmin();