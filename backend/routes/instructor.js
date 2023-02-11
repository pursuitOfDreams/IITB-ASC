const express = require('express');
const router = express.Router();
const {
    getInstructorInfo,
    getDeptInstr,
    getInstructorDepartments
} = require('../controllers/instructor');


// router.get('/instrDept', getInstructorDepartments)
router.get('/:instructor_id', getInstructorInfo);


module.exports = router;

