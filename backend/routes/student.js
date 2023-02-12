const express = require('express');
const router = express.Router();
const { getStudentInfo,getStudentInfoParams } = require('../controllers/student');

router.get('/', getStudentInfo);
router.get('/:student_id', getStudentInfoParams);

module.exports = router;
