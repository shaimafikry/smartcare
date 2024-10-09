// main entry
// importing
require('dotenv').config({ path: './config/.env' });

const PORT = process.env.PORT;
const express = require('express');
// to del with cookies
const cookieParser = require('cookie-parser');
// مكتبة لإعداد CORS (Cross-Origin Resource Sharing) للسماح لواجهة الـ frontend بالتواصل مع backend على سيرفرات مختلفة.
const cors = require('cors');

const signinRoute = require('./routes/signinRoute');
const managerRoute = require('./routes/managerRoute');
const doctorRoute = require('./routes/doctorRoute');
const nurseRoute = require('./routes/nurseRoute');
const receptionRoute = require('./routes/receptionRoute');
const signoutRoute = require('./routes/signoutRoute');

const app = express();

// Middleware
// json , cookieparser
app.use(express.json());
app.use(cookieParser());

// connec to front through api
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

// authentication and authorization
// signin and redirect to the user dashboard
app.use('/', signinRoute);
app.use('/', receptionRoute);
// app.use('/', managerRoute);
app.use('/', doctorRoute);
// app.use('/', nurseRoute);

app.use('/', signoutRoute);


app.listen(PORT, () => {
	console.log(`this server listens on port ${PORT}`);
});
