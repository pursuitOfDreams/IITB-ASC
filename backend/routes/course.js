const express = require('express');
const router = express.Router();
const {
    getCourseInfo,
    getDepartmentCourses,
    getAllRunningCourses
} = require("../controllers/course");
const { getDepartments } = require('../controllers/department');

router.get('/running', getDepartments);
router.get('/running/:dept_id', getDepartmentCourses)
router.get('/:course_id/', getCourseInfo);
router.get('/registration_courses/', getAllRunningCourses)

module.exports = router;
