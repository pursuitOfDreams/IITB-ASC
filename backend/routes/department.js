const express = require('express');
const router = express.Router();
const {
    getDepartments
} = require("../controllers/department");

router.get('/running', getDepartments);


module.exports = router;

