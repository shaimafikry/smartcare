// hanlde how to find user through route an what to get from request  and what to send through response
const jwt = require('jsonwebtoken');
const { findUser, validatePass } = require('../models/user');
require('dotenv').config({path: '../config/.env'})
const secret_key = process.env.SECRET_KEY;

async function signin (req, res) {
	const {email, password} = req.body;
	// search for user
	console.log(req.body);
	const user = await findUser(email);
	// for debug
	console.log(user);
	// handle if user not found
	if (!user) {
		return res.setHeader('content-Type', 'application/json').status(400).json({message : `Invalid Input: ${email} not found`});
	}

	// check valid password
	const isValidPassword =  await validatePass(password, user.password);
	if (!isValidPassword) {
		return res.setHeader('content-Type', 'application/json').status(400).json({message: 'Invalid input: Incorrect password'});

	}
	// create  the token m
	// const token = jwt.sign({id: user.id, role: user.role}, secret_key);

	// create token manually
	const payload = {
		'user_id': user.id,
		'role': user.role,
		'name': user.name.split(' ')[0],
		'department': user.department
		// 'exp': datetime.utcnow() + timedelta(hours=24)

	}
	console.log(payload);
	token =  jwt.sign(payload, secret_key, { algorithm: 'HS256' });
  
	//debug
  console.log(token);

	// send the token through the cookies and make the oken availbe during session only
	// redirect to the role(user) dashboard
	// make secure false to test it on postman
	res.cookie('token', token,  { httpOnly: true, secure: false, sameSite: 'strict'}).json({ message: 'Login successful',token, redirectUrl: `/${user.role}/dashboard` });
};

module.exports = {signin};
