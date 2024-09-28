// // backend/config/db.js
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'your_db_user', // استبدلها باسم مستخدم الداتا بيز بتاعتك
//   host: 'localhost',
//   database: 'your_db_name', // استبدلها باسم الداتا بيز
//   password: 'your_db_password', // استبدلها بكلمة مرور الداتا بيز
//   port: 5432,
// });

// module.exports = pool;

// backend/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;
