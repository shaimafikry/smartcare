// handle signin and signup routes
// import 
// import the files
const express = require('express');
const {addNewPatient, editPatient} = require('../controllers/receptionControl');
const { editUser } = require('../models/user')

const router = express.Router();

// edit receptionst profile
router.get('/reception/profile');
router.put('/reception/profile', editUser);

router.get('/reception/dashboard');
// router.put('/reception/dashboard', editPatient)
router.post('/reception/dashboard', addNewPatient);

module.exports = router;
