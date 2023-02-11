const express = require('express');
const router = express.Router();
const {
    getDepartments,
    getDeptCourses
} = require("../controllers/department");

router.get('/running', getDepartments);
router.get('/running/:dept_name', getDeptCourses)

module.exports = router;

