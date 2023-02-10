const express = require('express');
const router = express.Router();
const {loginUser} = require("../controllers/auth")
const {checkAuth} = require("../services/auth")

// login user
router.post('/login', loginUser);
// router.post('/login', loginUser);

// logout user 
// router.post('/logout', function(req, res){
//     logoutUser
//   });
// router.post("/logout", logoutUser);

// check logged in and get details
// router.post('/check', checkAuth);

module.exports = router