const session = require('express-session');
const jwt = require('jsonwebtoken');
const { findUserByEmail, validatePass } = require('../models/user');
const crypto = require('crypto');
require('dotenv').config({ path: './config/.env' });

const secret_key = process.env.SECRET_KEY;

const verifySession = ((req, res, next) => {
	const sessionId = req.cookies['sessionId']; // get the session id 
	const tabToken = req.headers['tab-token']; // git the tab token

	// Fetch the session from the database or in-memory store

	if (req.session && req.session.tabToken === tabToken) {
			// Session is valid and specific to this tab
			next();
	} else {
			// Invalid session or token mismatch
			res.status(401).json({ message: 'Invalid session' });
	}
});



module.exports = verifySession;
