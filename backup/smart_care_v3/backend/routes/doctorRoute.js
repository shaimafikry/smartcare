// handle signin and signup routes
// import 
// import the files

const express = require('express');
const { addNewPatientMedical, editExistPatient, showPatient, allPatient } = require('../controllers/doctorControl');
const { showUser } = require('../controllers/userControl')

const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();

// edit doctor profile
// router.get('/docotor/profile');
// router.put('/doctor/profile', editUser);

router.use(authToken);

router.get('/doctor/dashboard', allPatient);

router.get('/doctor/profile', showUser);

// router.post('/doctor/addPatient', addNewPatientMedical);
// router.get('/doctor/patient', showPatient);


module.exports = router;
