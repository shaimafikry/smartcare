// user functions module


// import database
// import bcrypt
const bcrypt = require('bcryptjs');


// check user 
async function findUser(email) {
	// => db code
	//const user = await
	// if user not found
	// return null;
	// if user found
	// return userdata
}

// add user (input is object)
async function addUser(user) {
 // handle error if user exist
 // hash pasword use bcrypt
 const hashedPass = await bcrypt.hash(password, 10);
 // add user to data base
}


// update user
async function updateUser() {
	// check if user found
	// update user
	// return true
}

// delete user
async function deleteUser () {
	// handle if user exist or not
	// dlete the user
	// return true
};

async function validatePass (password, hashedPassword) {
	// compare the givivn pass wih hashed one
	return await bcrypt.compare(password, hashedPass);
};

module.exports = { addUser, findUser, updateUser, deleteUser, validatePass };
