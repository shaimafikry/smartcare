// handle signin and signup routes
// import 
// import the files
const express = require('express');
const {register} = require('../controllers/managerControl');
const authToken = require('../middleware/authToken');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();



router.use(authToken);
router.use(verifyRole('manager'))


// for add a new user route
router.post('/users', register);
// router.get('/users', register);

module.exports = router;
