require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  timezone: 'Africa/Cairo'    // Set timezone to Cairo
});


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection(); // اختبار الاتصال

module.exports = sequelize;
