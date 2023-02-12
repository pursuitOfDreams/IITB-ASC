const express = require('express');
const router = express.Router();
const {
    getDepartments,
    getAllDepts
} = require("../controllers/department");

router.get('/running', getDepartments);
router.get('/departments', getAllDepts);


module.exports = router;

