const express = require('express');
const router = express.Router();
const {
    getCourseInfo,
    getDepartmentCourses,
    getAllRunningCourses,
    getAllCourses,
    getAllDeptCourses
} = require("../controllers/course");
const { getDepartments } = require('../controllers/department');

router.get('/allcourses', getAllCourses);
router.get('/allcourses/:dept_name', getAllDeptCourses);
router.get('/currentCourses', getAllRunningCourses);
router.get('/running', getDepartments);
router.get('/running/:dept_id', getDepartmentCourses)
router.get('/:course_id/', getCourseInfo);

module.exports = router;
