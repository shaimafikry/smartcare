const { addUser, findUser, findUserById, updateUser, deleteUser, validatePass, updateUserPassword } = require('../models/user');

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
    return res.status(400).json({ message: 'Old and new passwords are required' });
  }

  try {
    const userDb = await findUserById(user_id);

    if (!userDb) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await validatePass(old_Password, userDb.password);

    if (isValid) {
      const isUpdated = await updateUserPassword(userDb.email, password);

      if (isUpdated) {
        return res.status(200).json({ message: 'Password updated successfully' });
      } else {
        return res.status(400).json({ message: 'Password update failed' });
      }
    } else {
      return res.status(400).json({ message: 'Incorrect old password' });
    }
    
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'An error occurred while updating the password' });
  }
}

module.exports = { showUser, updatePassword };
