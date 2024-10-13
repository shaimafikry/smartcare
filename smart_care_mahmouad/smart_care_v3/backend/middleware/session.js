const session = require('express-session');
require('dotenv').config({ path: './config/.env' });

const secret_key = process.env.SECRET_KEY;


const sessionMiddleware = session({
  secret: secret_key,  // استبدلها بمفتاح سري قوي
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 60000 }
});

module.exports = sessionMiddleware;
