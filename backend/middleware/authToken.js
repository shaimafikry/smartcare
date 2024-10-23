// this function check the validty of token sent in request
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

const secret_key = process.env.SECRET_KEY;

//get the token from cookies after signin
const authToken = ((req, res, next) => {
	// 1- get the token from the cookies
	const token = req.cookies.token;
	// console.log(token);
	if (!token) {
		return res.status(401).send('Access Denied');
	}
	
	// if token found, verify it with secret key
	jwt.verify(token, secret_key, (err, user) => {
		//  if error occurd
		if (err) {
			return res.status(403).send('Invalid Token');	}
		// if token is valid return the user in the request body
		req.user = user;
		next();});
});


module.exports = authToken ;
