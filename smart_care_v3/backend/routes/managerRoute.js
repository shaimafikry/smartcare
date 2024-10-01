// handle signin and signup routes
// import 
// import the files
const express = require('express');
const {register} = require('../controllers/userControl');

const router = express.Router();

// for add a new user route
router.post('/users', register);
// router.get('/users', register);

module.exports = router;
