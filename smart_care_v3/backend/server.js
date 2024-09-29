
// main entry
// importing
require('dotenv').config('path:./config');

const PORT = process.env.PORT;
const express = require('express');
// to del with cookies
const cookieParser = require('cookie-parser');
// مكتبة لإعداد CORS (Cross-Origin Resource Sharing) للسماح لواجهة الـ frontend بالتواصل مع backend على سيرفرات مختلفة.
const cors = require('cors');

const authRoutes = require('./routes/authRoute');
const authToken = require('./middleware/authToken');

const app = express();

// Middleware
// json , cookieparser
app.use(express.json());
app.use(cookieParser());

// connec to front through api
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

// authentication and authorization


app.listen(PORT, () => {
	console.log(`this server listens on port ${PORT}`);
});
