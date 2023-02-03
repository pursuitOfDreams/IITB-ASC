const express = require('express');
const router = express.Router();
const {
    getInstructorInfo
} = require('../controllers/instructor');

router.get('/:instructor_id', getInstructorInfo);

module.exports = router;

