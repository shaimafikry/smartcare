const bcrypt = require('bcryptjs'); // or require('bcrypt') if you installed bcrypt

async function addUserToDatabase(username, plainTextPassword) {
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10); // 10 is the salt rounds, you can adjust it
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

  // Example SQL Insert query (using any database library like knex, sequelize, or raw SQL)

  console.log(`User ${username}  ${plainTextPassword} ${hashedPassword} added to the database with hashed password.`);
}

// Example usage
addUserToDatabase('testuser', 'hashed_password'); // replace with actual username and password
