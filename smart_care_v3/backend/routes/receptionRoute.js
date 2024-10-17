// handle signin and signup routes
// import 
// import the files
const express = require('express');
const { addNewPatient, editPatient } = require('../controllers/receptionControl');
const { showUser, updatePassword } = require('../controllers/userControl')
const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();


router.use(authToken);




router.get('/receptionist/dashboard');
router.get('/receptionist/profile', showUser);
router.put('/receptionist/profile', updatePassword);
router.post('/receptionist/dashboard', addNewPatient);




module.exports = router;
