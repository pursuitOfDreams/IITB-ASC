const express = require('express');
const router = express.Router();
const {
    getCourseInfo,
    getDepartmentCourses
} = require("../controllers/course");
const { getDepartments } = require('../controllers/department');

router.get('/running', getDepartments);
router.get('/:course_id/', getCourseInfo);
router.get('/running/:dept_id', getDepartmentCourses)

module.exports = router;
