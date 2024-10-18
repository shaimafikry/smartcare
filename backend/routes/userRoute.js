// handle signin and signup routes
// import 
// import the files
const express = require('express');
const { showUser, updatePassword, getUsersData, addNewUser } = require('../controllers/userControl');
const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();


router.use(authToken);




router.get('/profile', showUser);

router.put('/profile', updatePassword);


// users

router.post('/users', addNewUser);
router.get('/users', getUsersData);


module.exports = router;
