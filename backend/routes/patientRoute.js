// handle signin and signup routes
// import 
// import the files

const express = require('express');
const { editExistPatient, showPatient, departmentPatients, allPatients } = require('../controllers/patientControl');

const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();


router.use(authToken);
// router.use(verifyRole('doctor, nurse'))

router.get('/patients', allPatients);

router.put('/patients/:id/edit', editExistPatient);
// to show patient prfoile as a get request
router.get('/patients/:id/edit', showPatient);


module.exports = router;
