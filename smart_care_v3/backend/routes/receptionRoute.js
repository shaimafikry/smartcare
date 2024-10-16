// handle signin and signup routes
// import 
// import the files
const express = require('express');
const { addNewPatient, editPatient } = require('../controllers/receptionControl');
const { showUser } = require('../controllers/userControl')
const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// edit receptionst profile
// router.get('/reception/profile');
// router.put('/reception/profile', editUser);
router.use(authToken);
// router.use(verifyRole('receptionist'))

router.get('/receptionist/dashboard');
router.get('/receptionist/profile', showUser);

// router.put('/reception/dashboard', editPatient)
router.post('/receptionist/dashboard', addNewPatient);

module.exports = router;
