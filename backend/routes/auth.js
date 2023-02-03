const express = require('express');
const router = express.Router();
const {loginUser, checkUser} = require("../services/auth")

// login user
router.post('/login', loginUser)

// logout user 
router.post("/logout", logoutUser);

// check logged in and get details
router.get('/check', authUser, checkUser);

module.exports = router