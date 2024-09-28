// backend/config/createUsersTable.js
const pool = require('./db');

const createUsersTable = async () => {
  try {
    // إنشاء جدول المستخدمين
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        session_id VARCHAR(255),
        token VARCHAR(255),
        role VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        age INT,
        department VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log('Users table created successfully.');

    // إنشاء جدول أرقام هواتف المستخدمين
    await pool.query(`
      CREATE TABLE IF NOT EXISTS UsersPhone (
        user_id INT REFERENCES Users(id),
        id SERIAL PRIMARY KEY,
        phone_number VARCHAR(20) NOT NULL
      );
    `);
    console.log('UsersPhone table created successfully.');
    
  } catch (err) {
    console.error('Error creating Users table or UsersPhone table:', err);
  }
};

module.exports = createUsersTable;
