const jwt = require('jsonwebtoken');
const { findUser, validatePass } = require('../models/user');
require('dotenv').config('path: ../config')


async function register(req, res) {
  // when user click sudmit i get data in the req body
  const newUser = req.body;
	// check if i have this user
  const user = await findUser(newUser.email);

	if (user) {
		return res.status(400).send('User already exists');
	};

	await addUser(newUser);
	res.status(201).send('User registered');
};


module.exports = register;
