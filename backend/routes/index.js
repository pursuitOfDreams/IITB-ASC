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
router.use('/course', courseRouter);
// router.use('/student', studentRouter);
router.use('/student', getStudentInfo);
router.use('/instructor', instructorRouter);
router.get('/dept_instructors/:dept_name', getDeptInstr);
router.use('/', departmentRouter);


module.exports = router;