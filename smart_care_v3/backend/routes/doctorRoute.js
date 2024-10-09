// handle signin and signup routes
// import 
// import the files
const express = require('express');
const {addNewPatient, editPatient, showPatient, allPatient} = require('../controllers/doctorControl');
const { showUser } = require('../controllers/userControl')

const authToken = require('../middleware/authToken');

const router = express.Router();

// edit doctor profile
// router.get('/docotor/profile');
// router.put('/doctor/profile', editUser);

router.get('/doctor/dashboard', authToken, showUser, allPatient);
router.get('/doctor/profile', authToken, showUser);

// router.put('/reception/dashboard', editPatient)
router.post('/doctor/dashboard', addNewPatient);
// router.get('/doctor/dashboard', showPatient);


module.exports = router;
