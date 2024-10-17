

const { addUser, findUser,findUserById, updateUser, deleteUser, validatePass } = require('../models/user');

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
  console.log(req.body);
  const { old_Password, password } = req.body;
  try {
    const userDb = await findUserById(user_id);
		console.log(userDb.password);
		console.log(old_Password);
    const isValid = await validatePass(old_Password, userDb.password);
    if (isValid){
			await updateUser(userDb.email, password);
			res.status(200).json({ message: 'password updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'An error occurred' });
  }

}

module.exports = { showUser, updatePassword };
