const pool = require("../db");

// /course/:course_id
const getCourseInfo = async (req, res) => {
    try{
        const course_id = req.params.course_id.replace("%20", " ");
        console.log(course_id)
        const courseInfo = await pool.query(
            "SELECT course_id, title, credits FROM course WHERE course.course_id = $1;",
            [course_id]
        )
        const results = {};
        results.courseInfo = courseInfo.rows;

        const coursePrereq = await pool.query(
            "SELECT prereq_id FROM prereq WHERE course_id = $1",
            [course_id]
        );
        console.log(courseInfo)
        results.course_prereq = [];
        coursePrereq.rows.forEach((prereq) =>{
            results.course_prereq.push(prereq);
        });
        const courseInstructor = await pool.query(
            "SELECT ID, name, dept_name, semester, year FROM teaches as T NATURAL JOIN instructor as I WHERE course_id = $1;",
            [course_id]
        )
        results.course_instructors = [];
        courseInstructor.rows.forEach((inst) => {
            results.course_instructors.push(inst);
        });
        
        return res.status(200).json(results);
    } catch(err){
        console.log(err)
        return res
                .status(500)
                .json({message : ' There was an error while fetching course info. Please try again later.'});
    }
}
const getDepartmentCourses = async (req, res) => {
    const deptName = req.params.dept_id;

    try {
        const deptCourses = await pool.query(
            'SELECT * FROM course WHERE dept_name = $1;',[deptName]
        )
        const results = [];
        deptCourses.rows.forEach((dept_course) => {
            result = {};
            result.course_id = dept_course.course_id;
            result.title = dept_course.title;
            result.credits = dept_course.credits;
            results.push(result);
        });

        return res.status(200).json(result);
    } catch(err) {
        return res
                .status(500)
                .json({message : ' There was an error while fetching department courses. Please try again later.'});
    }
}

module.exports = {
    getDepartmentCourses,
    getCourseInfo
}