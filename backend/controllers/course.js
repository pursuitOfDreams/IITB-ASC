const pool = require("../db");
const { getCurrentSem } = require("./utils")


// /course/:course_id
const getCourseInfo = async (req, res) => {
    try {
        const course_id = req.params.course_id.replace("%20", " ");
        const courseInfo = await pool.query(
            "SELECT course_id, title, dept_name, credits FROM course WHERE course.course_id = $1;",
            [course_id]
        )
        const results = {};
        results.courseInfo = courseInfo.rows;

        const coursePrereq = await pool.query(
            "SELECT prereq_id FROM prereq WHERE course_id = $1",
            [course_id]
        );
        // console.log(courseInfo)
        results.course_prereq = [];
        coursePrereq.rows.forEach((prereq) => {
            results.course_prereq.push(prereq);
        });
        const courseInstructor = await pool.query(
            "SELECT distinct(ID), name, dept_name, semester, year FROM teaches as T NATURAL JOIN instructor as I WHERE course_id = $1;",
            [course_id]
        )
        results.course_instructors = [];
        courseInstructor.rows.forEach((inst) => {
            results.course_instructors.push(inst);
        });
        console.log(results)
        return res.status(200).json(results);
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ message: ' There was an error while fetching course info. Please try again later.' });
    }
}

const getDepartmentCourses = async (req, res) => {
    const deptName = req.params.dept_id;

    try {
        var today = new Date();
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result.rows[0].year;
        const sem = result.rows[0].semester;

        const deptCourses = await pool.query(
            'SELECT distinct A.course_id as course_id, B.title as title, B.credits as credits FROM section as A, course as B WHERE A.course_id=B.course_id AND B.dept_name = $1 AND A.year = $2 AND A.semester = $3;',
            [deptName, year, sem]
        )
        const results = [];
        deptCourses.rows.forEach((dept_course) => {
            let result = {};
            result.course_id = dept_course.course_id;
            result.title = dept_course.title;
            result.credits = dept_course.credits;
            results.push(result);
        });

        return res.status(200).json(results);
    } catch (err) {
        return res
            .status(500)
            .json({ message: ' There was an error while fetching department courses. Please try again later.' });
    }
}


const getAllRunningCourses = async (req, res) => {
    try {
        var today = new Date();
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result.rows[0].year;
        const sem = result.rows[0].semester;

        const runningCourses = await pool.query(
            'SELECT A.course_id as course_id, B.title as title, B.credits as credits, A.sec_id FROM section as A, course as B WHERE A.course_id=B.course_id AND A.year = $1 AND A.semester = $2;',
            [ year, sem]
        )
        const results = {
            courses : [],
            courseToSec : {}
        };

        var courseToSecMap = {};
        // with sections
        for(let i=0;i<runningCourses.rows.length ;i++){
            let course_id = runningCourses.rows[i].course_id;
            let sec_id = runningCourses.rows[i].sec_id;
            results.courseToSec[course_id] = results.courseToSec[course_id] || [];
            results.courseToSec[course_id].push(sec_id);
        }

        const runningCourses1 = await pool.query(
            'SELECT distinct A.course_id as course_id, B.title as title, B.credits as credits FROM section as A, course as B WHERE A.course_id=B.course_id AND A.year = $1 AND A.semester = $2;',
            [ year, sem]
        )
        
        // without sections 
        runningCourses1.rows.forEach((course) => {
            let result={}
            result.course_id = course.course_id;
            result.title = course.title;
            result.credits = course.credits;
            result.sec_id = course.sec_id;
            results.courses.push(result);
        });
        
        // for(let i=0; i<results.length; i++){

        // }

        return res.status(200).json(results);
    } catch (err) {

        return res
            .status(500)
            .json({ message: ' There was an error while fetching department courses. Please try again later.' });
    }
}

module.exports = {
    getDepartmentCourses,
    getCourseInfo,
    getAllRunningCourses
}