const { addUser, findUserByEmail, findUserById, updateUser, deleteUser, validatePass, updateUserPassword, getSpecificUsers } = require('../models/user');






async function addNewUser(req, res) {
  // when user click sudmit i get data in the req body
  const newUser = req.body;
	// check if i have this user
	// console.log(newUser);
  const user = await findUserByEmail(newUser.email);

	if (user) {
		return res.status(400).json({message: 'User already exists!'});
	};

	try {
		await addUser(newUser);
		res.status(201).send('User registered');
	} catch {
		console.error('Error adding user');
		return res.status(400).json({ message: 'Please add all fileds.' });

	}

	
	
};


// Show user details
async function showUser(req, res) {
  const user_id = req.user.user_id; // Assuming req.user is populated by the authToken middleware

  try {
    const user = await findUserById(user_id);

    if (user) {
      res.status(200).json({ user });
      console.log("User found:", user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'An error occurred while fetching user' });
  }
}




// Update password
async function updatePassword(req, res) {
	
  const user_id = req.user.user_id; // Assuming req.user is populated by the authToken middleware
  const { old_Password, password } = req.body;

  // Check if both old_Password and new password are provided
  if (!old_Password || !password) {
    return res.status(400).json({ message: 'Old and new passwords are required!' });
  }

  try {
    const userDb = await findUserById(user_id);

    if (!userDb) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const isValid = await validatePass(old_Password, userDb.password);

    if (isValid) {
      const isUpdated = await updateUserPassword(userDb.email, password);

      if (isUpdated) {
        return res.status(200).json({ message: 'Password updated successfully.' });
      } else {
        return res.status(400).json({ message: 'Password update failed.' });
      }
    } else {
      return res.status(400).json({ message: 'Incorrect old password!' });
    }
    
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'An error occurred while updating the password' });
  }
}




async function getUsersData (req, res) {
  try {
    const [nurses, doctors, receptionists, managers] = await Promise.all([
      getSpecificUsers('nurse'),
      getSpecificUsers('doctor'),
      getSpecificUsers('receptionist'),
      getSpecificUsers('manager'),
    ]);

    res.status(200).json({ nurses, doctors, receptionists, managers });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard data' });
  }
};


module.exports = { showUser, updatePassword, getUsersData, addNewUser };
