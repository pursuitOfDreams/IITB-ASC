const pool = require("../db")

const getDepartments = async (req, res) => {
    try{
        const departmentList = await pool.query(
            "SELECT distinct department.dept_name FROM section, course, department WHERE section.course_id = course.course_id AND department.dept_name = course.dept_name;"
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
    getDepartments
}