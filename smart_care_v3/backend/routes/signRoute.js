// handle signin and signup routes
// import 
// import the files
const express = require('express');
const {signin, register} = require('../controller/authcontrol');

const router = express.Router();

router.post('/signin', signin);
router.post('/user', register);

module.exports = router;
