// handle signin and signup routes
// import 
// import the files
const express = require('express');
const {addNewPatient, editPatient} = require('../controllers/receptionControl');
const { editUser, showUser } = require('../models/user')

const authToken = require('../middleware/authToken');

const router = express.Router();

// edit receptionst profile
// router.get('/reception/profile');
// router.put('/reception/profile', editUser);

router.get('/reception/home', authToken, showUser);
// router.put('/reception/dashboard', editPatient)
router.post('/reception/home', addNewPatient);

module.exports = router;
