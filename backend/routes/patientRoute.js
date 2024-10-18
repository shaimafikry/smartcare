// handle signin and signup routes
// import 
// import the files

const express = require('express');
const { editExistPatient, showPatient, departmentPatients, allPatients, addNewPatient  } = require('../controllers/patientControl');

const authToken = require('../middleware/authToken');
const router = express.Router();


router.use(authToken);
// router.use(verifyRole('doctor, nurse'))

router.get('/patients', allPatients);
router.get('/patients/:id/edit', showPatient);
router.get('/patients/:department', departmentPatients);


router.put('/patients/:id/edit', editExistPatient);
router.post('/patients/addNewPatient', addNewPatient);




module.exports = router;
