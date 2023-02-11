const pool = require("../db")

const getDeptInstr = async (req,res) =>{
    try{
        dept_name = req.params.dept_name
        // console.log('a', dept_name)
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
        const instructorId = req.params.instructor_id;
        // console.log(instructorId);
        const instructorInfo = await pool.query(
            "SELECT * FROM instructor WHERE ID = $1;", [instructorId]
        )
        // console.log(instructorInfo)
        const instructorPastCourses = await pool.query(
            "SELECT course.course_id as course_id, course.title as title, teaches.semester as sem, teaches.year as year FROM instructor, teaches, course WHERE instructor.ID = teaches.ID AND instructor.ID = $1 AND course.course_id = teaches.course_id ORDER BY year DESC;",
            [instructorId]
        )
        var results = {};
        results.instructorInfo = instructorInfo.rows;
        results.pastCourses = []
        instructorPastCourses.rows.forEach((course) => {
            // console.log(course)
            results.pastCourses.push(course);
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

module.exports = {
    getInstructorInfo,
    getDeptInstr
}