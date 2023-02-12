const express = require('express');
const router = express.Router();
const {loginUser,logout} = require("../controllers/auth")

// login user
router.post('/login', loginUser);
router.get('/logout', logout);

module.exports = router