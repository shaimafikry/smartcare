// user functions module

// user functions module

// import database
const bcrypt = require('bcryptjs');
const { User } = require('../config/users');
// check user 





async function findUser(email) {
    const user = await User.findOne({ where: { email } });
		// console.log(user.password);

    return user ? user.get({ plain: true }) : null; // إرجاع بيانات المستخدم بشكل بسيط
}





async function findUserById(id) {
	const user = await User.findOne({ where: { id } });
	// console.log(user.password);
	return user ? user.get({ plain: true }) : null; // إرجاع بيانات المستخدم بشكل بسيط
}





// add user (input is object)
async function addUser(user) {
    // handle error if user exists
    const existingUser = await findUser(user.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    // hash password using bcrypt
    const hashedPass = await bcrypt.hash(user.password, 10);
    // add user to database
    const newUser = await User.create({ ...user, password: hashedPass });
    return newUser.get({ plain: true }); // إرجاع بيانات المستخدم الجديد
}



// update user password
async function updateUserPassword(email, newPassword) {
	// إذا كنت تريد تحديث كلمة المرور، عليك أن تقوم بتشفيرها أولاً
	newPassword = await bcrypt.hash(newPassword, 10);
	console.log("pass after hash", newPassword)
	await User.update({ password: newPassword }, { where: { email } });
	return true; // إرجاع true عند النجاح
}


// update user
async function updateUser(email, updates) {
	  console.log("uodate user function", updates)
    const user = await findUser(email);
    if (!user) {
        throw new Error('User not found');
    }
		console.log("pass before hash", updates.password)

    // إذا كنت تريد تحديث كلمة المرور، عليك أن تقوم بتشفيرها أولاً
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
				console.log("in update user",updates.password);
    }
    console.log("pass after hash", updates.password)
    await User.update(updates, { where: { email } });
    return true; // إرجاع true عند النجاح
}

// delete user
async function deleteUser(email) {
    const user = await findUser(email);
    if (!user) {
        throw new Error('User not found');
    }
    
    await User.destroy({ where: { email } });
    return true; // إرجاع true عند النجاح
}

// Validate password
async function validatePass(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};




// Fetch specific users based on their role
async function getSpecificUsers(role) {
    try {
      const users = await User.findAll({ where: { role } });
      return users; // Return the users when found
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Handle the error appropriately
    }
  }
  

module.exports = { addUser, findUser, updateUser, deleteUser, validatePass, findUserById, updateUserPassword, getSpecificUsers };























// // import database
// // import bcrypt
// const bcrypt = require('bcryptjs');


// // check user 
// async function findUser(email) {
// 	// => db code
// 	//const user = await
// 	// if user not found
// 	// return null;
// 	// if user found
// 	// return userdata
// }

// // add user (input is object)
// async function addUser(user) {
//  // handle error if user exist
//  // hash pasword use bcrypt
//  const hashedPass = await bcrypt.hash(password, 10);
//  // add user to data base
// }


// // update user
// async function updateUser() {
// 	// check if user found
// 	// update user
// 	// return true
// }

// // delete user
// async function deleteUser () {
// 	// handle if user exist or not
// 	// dlete the user
// 	// return true
// };

// async function validatePass (password, hashedPassword) {
// 	// compare the givivn pass wih hashed one
// 	return await bcrypt.compare(password, hashedPass);
// };

// module.exports = { addUser, findUser, updateUser, deleteUser, validatePass };
