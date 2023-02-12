const pool = require("../db");

const getDepartments = async (req, res) => {
    try{
        var today = new Date();
        const result1 = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result1.rows[0].year;
        const sem = result1.rows[0].semester;
        // list of departments offering the course in the current sem
        const departmentList = await pool.query(
            "SELECT distinct department.dept_name FROM section, course, department WHERE section.course_id = course.course_id AND department.dept_name = course.dept_name AND section.year = $1 AND section.semester = $2;",
            [year, sem]
        )
        const result = departmentList.rows;
        return res.status(200).json(result);

    } catch (err) {
        return res
                .status(500)
                .json({message : "Couldn't find the departments. Please try again later"});
    }
}

const getAllDepts = async (req, res) => {
    try {
        const courses = await pool.query(
            'SELECT dept_name from department;'
        )
        const results = {};
        results.courses = courses.rows;
        
        return res.status(200).json(results);
    } catch (err) {

        return res
            .status(500)
            .json({ message: ' There was an error while fetching department courses. Please try again later.' });
    }
}

module.exports = {
    getDepartments,
    getAllDepts
}