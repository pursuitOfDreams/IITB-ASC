const pool = require("../db");
const { getCurrentSem } = require("./utils");


const getStudentInfo = async (req, res) => {

    try {
        // const {username} = req.params;
        // const loggedUserId = req.user.id;
        var today = new Date();
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result.rows[0].year;
        const sem = result.rows[0].semester;

        const info = getCurrentSem();
        const student_id = req.session.uID;
        // console.log('a', student_id)
        const studentInfo = await pool.query(
            "SELECT * FROM student WHERE ID = $1;",
            [student_id]
        )
        const results = studentInfo.rows[0];
        console.log(results)
        results.coursesTaken = []
        results.currentCourses = []

        const studentCurrentCourses = await pool.query(
            "SELECT takes.course_id, title, sec_id, semester, year, grade FROM takes, course WHERE ID = $1 and course.course_id=takes.course_id and takes.year = $2 AND takes.semester = $3;",
            [student_id, year, sem]
        )
        const studentPastCourses = await pool.query(
            "SELECT takes.course_id, title, sec_id, semester, year, grade FROM takes, course WHERE ID = $1 and course.course_id=takes.course_id and (takes.year != $2 OR takes.semester != $3);",
            [student_id, year, sem]
        )

        studentCurrentCourses.rows.forEach((course) => {
            results.currentCourses.push(course)
        })
        studentPastCourses.rows.forEach((course) => {
            results.coursesTaken.push(course)
        })
        return res
            .status(200)
            .json(results)

    } catch (err) {
        return res
            .status(500)
            .json({ message: ' There was an error while fetching student info. Please try again later.' });
    }
}

module.exports = {
    getStudentInfo
}