const courseRouter = require("./course");
const studentRouter = require("./student");
const instructorRouter = require("./instructor");
const departmentRouter = require("./department");

const router = require("express").Router();

router.use('/course', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, courseRouter);
router.use('/student', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, studentRouter);
router.use('/instructor', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, instructorRouter);
router.use('/', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, departmentRouter);

module.exports = router;