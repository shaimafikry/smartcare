
const express = require('express');
const {signin, signout} = require('../controllers/authControl');
const verifySession = require('../middleware/verifySession');
const authToken = require('../middleware/authToken');


const router = express.Router();

router.post('/login', signin);

router.post('/signout',authToken,verifySession, signout);

module.exports = router;
