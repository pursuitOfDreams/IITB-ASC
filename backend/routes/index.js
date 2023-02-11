const courseRouter = require("./course");
const studentRouter = require("./student");
const instructorRouter = require("./instructor");
const departmentRouter = require("./department");
const authRouter = require("./auth");
const { checkAuth, loginUser } = require("../controllers/auth");
const { getStudentInfo } = require("../controllers/student");
const { getDeptInstr } = require("../controllers/instructor");
const router = require("express").Router();

router.use('/auth', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, authRouter);
router.use('/course',checkAuth, courseRouter);
// router.use('/student', studentRouter);
router.use('/student', checkAuth, getStudentInfo);
router.use('/instructor', checkAuth, instructorRouter);
router.get('/dept_instructors/:dept_name', checkAuth, getDeptInstr);
router.use('/', checkAuth, departmentRouter);


module.exports = router;