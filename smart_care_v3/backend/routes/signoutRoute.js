const {signout} = require('../controllers/signoutControl')
const express = require('express');

const router = express.Router();

router.post('/signout', signout);

module.exports = router;
