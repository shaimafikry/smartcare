// handle signin and signup routes
// import 
// import the files
const express = require('express');
const {signin} = require('../controllers/signinControl');

const router = express.Router();

router.post('/login', signin);

module.exports = router;
