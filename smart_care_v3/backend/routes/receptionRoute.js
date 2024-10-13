// handle signin and signup routes
// import 
// import the files
const express = require('express');
const { addNewPatient, editPatient } = require('../controllers/receptionControl');
const { showUser } = require('../controllers/userControl')

const authToken = require('../middleware/authToken');

const router = express.Router();

// edit receptionst profile
// router.get('/reception/profile');
// router.put('/reception/profile', editUser);

router.get('/receptionist/dashboard', authToken);
router.get('/receptionist/profile', authToken, showUser);

// router.put('/reception/dashboard', editPatient)
router.post('/receptionist/dashboard', addNewPatient);

module.exports = router;
