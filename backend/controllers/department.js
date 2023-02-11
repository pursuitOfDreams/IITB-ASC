const pool = require("../db");
const { getCurrentSem } = require("./utils");

const getDepartments = async (req, res) => {
    try{
        const info = getCurrentSem()
        // list of departments offering the course in the current sem
        const departmentList = await pool.query(
            "SELECT distinct department.dept_name FROM section, course, department WHERE section.course_id = course.course_id AND department.dept_name = course.dept_name AND section.year = $1 AND section.semester = $2;",
            [(await info).year, (await info).sem]
        )
        const result = departmentList.rows;
        return res.status(200).json(result);

    } catch (err) {
        return res
                .status(500)
                .json({message : "Couldn't find the departments. Please try again later"});
    }
}

// const getDeptCourses = async (req,res) => {

//     try{
//         dept_name = req.params.dept_name
//         const info = getCurrentSem();
//         const courseList = await pool.query(
//             "select A.course_id as course_id, B.title from section as A, course as B where dept_name=$1 AND A.course_id = B.course_id AND A.year = $2 AND A.semester = $3;",
//             [dept_name, (await info).year, (await info).sem]
//         )
//         const result = courseList.rows;
//         return res.status(200).json(result);

//     } catch (err) {
//         return res
//                 .status(500)
//                 .json({message : "Couldn't find the departments. Please try again later"});
//     }
// }

module.exports = {
    getDepartments,
    // getDeptCourses
}