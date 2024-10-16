// handle signin and signup routes
// import 
// import the files

const express = require('express');
const { departmentPatients } = require('../controllers/patientControl');
const { showUser } = require('../controllers/userControl')
const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

router.use(authToken);
// router.use(verifyRole(['doctor']))



router.get('/doctor/dashboard', departmentPatients);

router.get('/doctor/profile', showUser);


module.exports = router;
