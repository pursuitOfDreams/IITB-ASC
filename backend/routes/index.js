const courseRouter = require("./course");
const studentRouter = require("./student");
const instructorRouter = require("./instructor");
const departmentRouter = require("./department");
const authRouter = require("./auth");
const { checkAuth, loginUser } = require("../controllers/auth");
const router = require("express").Router();

router.use('/auth', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, authRouter);
router.use('/course', checkAuth, courseRouter);
router.use('/student', checkAuth, studentRouter);
router.use('/instructor', checkAuth, instructorRouter);
router.use('/', checkAuth, departmentRouter);


module.exports = router;