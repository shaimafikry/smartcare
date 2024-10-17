

const { addUser, findUser,findUserById, updateUser, deleteUser, validatePass, updateUserPassword } = require('../models/user');



async function showUser(req, res) {
  // Assuming req.user is populated by the authToken middleware
  const user_id = req.user.user_id;
  console.log(user_id);

  try {
    const user = await findUserById(user_id);

    if (user) {
      res.status(200).json({
        user: user, // Include the user object in the response
      });
      console.log("in user control",user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}


async function updatePassword(req, res){
     // Assuming req.user is populated by the authToken middleware
  const user_id = req.user.user_id;
  const { old_Password, password } = req.body;

  try {
    const userDb = await findUserById(user_id);

    const isValid = await validatePass(old_Password, userDb.password);

    if (isValid){
<<<<<<< Updated upstream:backend/controllers/userControl.js
<<<<<<< Updated upstream:backend/controllers/userControl.js

			const isUpdated = await updateUserPassword(userDb.email, password);

			if (isUpdated) {

				res.status(200).json({ message: 'password updated' });

			}else {

				res.status(400).json({ message: 'password not updated' });
			}
    } else {

      res.status(404).json({ message: 'wrong old password' });
=======
			const isUpdated = await updateUser(userDb.email, password);
      if (isUpdated) 
      {
        console.log("Password Updated successfully")
        res.status(200).json({ message: 'password updated' });
      }
      else {
        console.log("Password haven't Updated yet")

      }
    } else {

=======
			const isUpdated = await updateUser(userDb.email, password);
      if (isUpdated) 
      {
        console.log("Password Updated successfully")
        res.status(200).json({ message: 'password updated' });
      }
      else {
        console.log("Password haven't Updated yet")

      }
    } else {

>>>>>>> Stashed changes:smart_care_v3/backend/controllers/userControl.js
      res.status(404).json({ message: 'User not found' });
>>>>>>> Stashed changes:smart_care_v3/backend/controllers/userControl.js
    }
  } catch (error) {

    console.error('Error fetching user:', error);
		
    res.status(500).json({ message: 'An error occurred' });
  }

}

module.exports = { showUser, updatePassword };
