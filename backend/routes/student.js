const express = require('express');
const router = express.Router();
const { getStudentInfo } = require('../controllers/student');

router.get('/:student_id', getStudentInfo);

module.exports = router;
