const pool = require("../db")

const getDeptInstr = async (req,res) =>{
    try{
        dept_name = req.params.dept_name
        const courseList = await pool.query(
            "select ID, name from instructor where dept_name=$1;",
            [dept_name]
        )
        const result = courseList.rows;
        return res.status(200).json(result);

    } catch(err){
        console.log(err)
        return res
                .status(500)
                .json({ message: ' There was an error while fetching istructor info. Please try again later.' })
    }
}
const getInstructorInfo = async (req, res) => {
    try{
        var today = new Date();
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result.rows[0].year;
        const sem = result.rows[0].semester;

        const instructorId = req.params.instructor_id;

        const instructorInfo = await pool.query(
            "SELECT * FROM instructor WHERE ID = $1;", [instructorId]
        )

        const instructorCurrentCourses = await pool.query(
            "SELECT course.course_id as course_id, course.title as title, teaches.semester as sem, teaches.year as year FROM instructor, teaches, course WHERE instructor.ID = teaches.ID AND instructor.ID = $1 AND course.course_id = teaches.course_id AND (teaches.year = $2 AND teaches.semester = $3) ORDER BY year DESC;",
            [instructorId, year, sem]
        )

        const instructorPastCourses = await pool.query(
            "SELECT course.course_id as course_id, course.title as title, teaches.semester as sem, teaches.year as year FROM instructor, teaches, course WHERE instructor.ID = teaches.ID AND instructor.ID = $1 AND course.course_id = teaches.course_id AND (teaches.year != $2 OR teaches.semester != $3) ORDER BY year DESC;",
            [instructorId, year, sem]
        )
        var results = {};
        results.instructorInfo = instructorInfo.rows;
        results.pastCourses = []
        results.currentCourses = []
        instructorPastCourses.rows.forEach((course) => {

            results.pastCourses.push(course);
        });

        instructorCurrentCourses.rows.forEach((course) => {

            results.currentCourses.push(course);
        });
        return res
                .status(200)
                .json(results)
    } catch(err){
        console.log(err)
        return res
                .status(500)
                .json({ message: ' There was an error while fetching istructor info. Please try again later.' })
    }
}

const getInstructorDepartments = async (req, res) => {
    try{
        // list of departments offering the course in the current sem
        const departmentList = await pool.query(
            "SELECT distinct dept_name FROM instructor;",
        )
        const result = departmentList.rows;
        return res.status(200).json(result);

    } catch (err) {
        return res
                .status(500)
                .json({message : "Couldn't find the departments. Please try again later"});
    }
}


module.exports = {
    getInstructorInfo,
    getDeptInstr,
    getInstructorDepartments
}