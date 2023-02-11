const express = require('express');
const router = express.Router();
const {loginUser,logout} = require("../controllers/auth")
const {checkAuth} = require("../services/auth")

// login user
router.post('/login', loginUser);
router.get('/logout', logout);
// router.post('/login', loginUser);

// logout user 
// router.post('/logout', function(req, res){
//     logoutUser
//   });
// router.post("/logout", logoutUser);

// check logged in and get details
router.get('/check', (req, res)=>{
    try { 
        console.log(req.session.isLoggedin)
        res.json(req.session.isLoggedin)
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
});

module.exports = router