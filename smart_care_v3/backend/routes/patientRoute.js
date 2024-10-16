// handle signin and signup routes
// import 
// import the files

const express = require('express');
const { addNewPatientMedical, editExistPatient, showPatient, allPatient, dischagredPatient } = require('../controllers/patientControl');
const { showUser } = require('../controllers/userControl')

const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();


router.use(authToken);
// router.use(verifyRole('doctor, nurse'))

// router.get('/patients', showAllPatients);

router.put('/patients/:id/edit', editExistPatient);
// to show patient prfoile as a get request
router.get('/patients/:id/edit', showPatient);


module.exports = router;
