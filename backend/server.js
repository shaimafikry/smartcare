// main entry
// importing
require('dotenv').config({ path: './config/.env' });

const PORT = 5000;
const express = require('express');
// to del with cookies
const cookieParser = require('cookie-parser');
// CORS (Cross-Origin Resource Sharing) for allowing frontend to communicate with backend in different servers.
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const patientRoute = require('./routes/patientRoute');
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
app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', patientRoute);


app.listen(PORT, () => {
	console.log(`this server listens on port ${PORT}`);
});
