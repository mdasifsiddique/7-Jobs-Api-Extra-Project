const express = require('express')
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const checkTestUser = require("../middleware/checkTestUser");


const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
    windowMs : 15*60*1000,
    max : 10,
    message:{
        msg:'Too many request from this IP , Please try after 15 minutes'
    }
})

const { register, login , updateUser} = require('../controllers/auth')
router.post('/register',apiLimiter , register)
router.post('/login', apiLimiter , login);
router.patch('/updateUser', authenticateUser ,checkTestUser, updateUser)

module.exports = router
