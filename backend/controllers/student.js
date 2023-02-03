const pool = require("../db");

const loginHandler = async (req, res) => {
    
}
const getStudentInfo = async (req, res) => {

    try{
        // const {username} = req.params;
        // const loggedUserId = req.user.id;
        const student_id = req.params.student_id;
        const studentInfo = await pool.query(
            "SELECT * FROM student WHERE ID = $1;",
            [student_id]
        )
        const results = studentInfo.rows[0];
        results.coursesTaken = []
        const studentPastCourses = await pool.query(
            "SELECT * FROM takes WHERE ID = $1;",
            [student_id]
        )
        studentPastCourses.rows.forEach((course) => {
            results.coursesTaken.push(course)
        })
        return res
                .status(200)
                .json(results)

    } catch(err){
        return res
                .status(500)
                .json({message : ' There was an error while fetching student info. Please try again later.'});
    }
}

module.exports = {
    getStudentInfo
}