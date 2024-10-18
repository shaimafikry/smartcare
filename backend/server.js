// main entry
// importing
require('dotenv').config({ path: './config/.env' });

const PORT = 5000;
const express = require('express');
// to del with cookies
const cookieParser = require('cookie-parser');
// مكتبة لإعداد CORS (Cross-Origin Resource Sharing) للسماح لواجهة الـ frontend بالتواصل مع backend على سيرفرات مختلفة.
const cors = require('cors');

const signinRoute = require('./routes/signinRoute');
const userRoute = require('./routes/userRoute');
const patientRoute = require('./routes/patientRoute');
const signoutRoute = require('./routes/signoutRoute');
const sessionMiddleware = require('./middleware/session');
const app = express();

// Middleware
// json , cookieparser
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);
// connec to front through api
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

// authentication and authorization
// signin and redirect to the user dashboard
app.use('/', signinRoute);
app.use('/', userRoute);
app.use('/', signoutRoute);
app.use('/', patientRoute);


app.listen(PORT, () => {
	console.log(`this server listens on port ${PORT}`);
});