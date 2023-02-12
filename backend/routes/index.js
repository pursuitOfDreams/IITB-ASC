const courseRouter = require("./course");

const studentRouter = require("./student");
const instructorRouter = require("./instructor");
const departmentRouter = require("./department");
const authRouter = require("./auth");
const { checkAuth} = require("../controllers/auth");
const { getDeptInstr, getInstructorDepartments } = require("../controllers/instructor");
const router = require("express").Router();
const { register_course, drop_course } = require("../controllers/registration")

router.use('/auth', (req, res, next) => {
    next()
  }, authRouter);
router.use('/course',checkAuth, courseRouter);
router.use('/student', checkAuth, studentRouter);
router.use('/instructor/instrDept', checkAuth, getInstructorDepartments);
router.use('/instructor', checkAuth, instructorRouter);
router.get('/dept_instructors/:dept_name', checkAuth, getDeptInstr);
router.post('/registration', checkAuth, register_course);
router.post('/drop_course', checkAuth, drop_course);
router.use('/', checkAuth, departmentRouter);


module.exports = router;