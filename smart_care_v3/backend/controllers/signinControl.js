// hanlde how to find user through route an what to get from request  and what to send through response
const jwt = require('jsonwebtoken');
const { findUser, validatePass } = require('../models/user');
require('dotenv').config('path: ../config')
const secret_key = process.env.SECRET_KEY;

async function signin (req, res) {
	const {email, password} = req.body;
	// search for user
	const user = await findUser(email);
	// for debug
	console.log(user);
	// handle if user not found
	if (!user) {
		return res.setHeader({'content-Type': 'application/json'}).status(400).json({message : `Invalid Input: ${email} not found`});
	}

	// check valid password
	const isValidPassword =  await validatePass(password, user.password);
	if (!isValidPassword) {
		return res.status(400).json({message: 'Invalid input: Incorrect password'});

	}
	// create  the token 
	const token = jwt.sigin({username: user.username, role: user.role}, secret_key);
  
	//debug
  console.log(token);

	// send the token through the cookies and make the oken availbe during session only
	// redirect to the role(user) dashboard
	res.cookies('token', token,  { httpOnly: true, secure: true, sameSite: strict}).json({ message: 'Login successful', redirectUrl: `${user.role}/dashboard` });
};

module.exports = {signin, register};
