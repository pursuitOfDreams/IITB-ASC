const pool = require("../db");

const getStudentInfo = async (req, res) => {
    try {
        var today = new Date();
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result.rows[0].year;
        const sem = result.rows[0].semester;

        const student_id = req.session.uID;

        const studentInfo = await pool.query(
            "SELECT * FROM student WHERE ID = $1;",
            [student_id]
        )
        const results = studentInfo.rows[0];
        results.coursesTaken = {}
        results.currentCourses = []
        results.semList = []
        const studentCurrentCourses = await pool.query(
            "SELECT takes.course_id, title, sec_id, semester, year, grade FROM takes, course WHERE ID = $1 and course.course_id=takes.course_id and takes.year = $2 AND takes.semester = $3;",
            [student_id, year, sem]
        )
        const studentPastCourses = await pool.query(
            "SELECT takes.course_id, title, sec_id, semester, year, grade FROM takes, course WHERE ID = $1 and course.course_id=takes.course_id and (takes.year != $2 OR takes.semester != $3) ORDER BY year DESC, semester asc;",
            [student_id, year, sem]
        )
        
        studentCurrentCourses.rows.forEach((course) => {
            results.currentCourses.push(course)
        })
        var semToCourse = {}
        studentPastCourses.rows.forEach((course) => {
            let sem = course.semester + "  " + course.year;
            semToCourse[sem] = semToCourse[sem] || []
            semToCourse[sem].push(course)
        })
        results.semList= Object.keys(semToCourse)
        results.coursesTaken = semToCourse
        return res
            .status(200)
            .json(results)

    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ message: ' There was an error while fetching student info. Please try again later.' });
    }
}

const getStudentInfoParams = async (req, res) => {
    try {
        const sID = req.params.student_id
        console.log("logged in ",req.session.isLoggedin)
        console.log("student "+req.session.isStudent)
        console.log("uID " + req.session.uID)
        console.log(req.session.isLoggedin && req.session.isStudent && (req.session.uID!=sID))

        if(req.session.isLoggedin && req.session.isStudent && (req.session.uID!=sID)){
            return res
            .status(500)
            .json({ message: 'Unauthourized user access to other user info' });
        }

        var today = new Date();
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result.rows[0].year;
        const sem = result.rows[0].semester;
        
        const studentInfo = await pool.query(
            "SELECT * FROM student WHERE ID = $1;",
            [sID]
        )
        const results = studentInfo.rows[0];
        results.coursesTaken = {}
        results.currentCourses = []
        results.semList = []
        const studentCurrentCourses = await pool.query(
            "SELECT takes.course_id, title, sec_id, semester, year, grade FROM takes, course WHERE ID = $1 and course.course_id=takes.course_id and takes.year = $2 AND takes.semester = $3;",
            [sID, year, sem]
        )
        const studentPastCourses = await pool.query(
            "SELECT takes.course_id, title, sec_id, semester, year, grade FROM takes, course WHERE ID = $1 and course.course_id=takes.course_id and (takes.year != $2 OR takes.semester != $3) ORDER BY year DESC, semester asc;",
            [sID, year, sem]
        )
        
        studentCurrentCourses.rows.forEach((course) => {
            results.currentCourses.push(course)
        })
        var semToCourse = {}
        studentPastCourses.rows.forEach((course) => {
            let sem = course.semester + "  " + course.year;
            semToCourse[sem] = semToCourse[sem] || []
            semToCourse[sem].push(course)
        })
        results.semList= Object.keys(semToCourse)
        results.coursesTaken = semToCourse
        return res
            .status(200)
            .json(results)

    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ message: ' There was an error while fetching student info. Please try again later.' });
    }
}

module.exports = {
    getStudentInfo,
    getStudentInfoParams
}