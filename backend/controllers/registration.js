const pool = require("../db")

const register_course = async (req, res) => {
    try {
        var today = new Date();
        const result1 = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result1.rows[0].year;
        const sem = result1.rows[0].semester;
        
        const { course_id, sec_id } = req.body;
        const student_id = req.session.uID;
        const grade = '-';

        const prereqInfo = await pool.query(
            "(SELECT prereq_id FROM prereq WHERE course_id = $1) EXCEPT (SELECT course_id FROM takes WHERE ID = $2);",
            [course_id, student_id]
        )

        if (prereqInfo.rows.length != 0) {
            return res.status(500).json({ message: "Prereq criteria not satisfied" });
        }

        const alreadyPresent = await pool.query(
            "SELECT * FROM takes WHERE ID = $1 and course_id = $2 and sec_id = $3 and semester = $4 and year = $5",
            [student_id, course_id, sec_id, sem, year]
        )

        if (alreadyPresent.rows.length !=0 ){
            return res.status(400).json({ message: "Course already registered" });
        }
        
        const result = await pool.query(
            "INSERT INTO takes VALUES ($1, $2, $3, $4, $5, null);",
            [student_id, course_id, sec_id, sem, year]
        )

        return res.status(200).json({ message: "Course was registered" })

    } catch (err) {
        return res
            .status(500)
            .json({ message: "Couldn't register for the course" });
    }
}

const drop_course = async (req, res) => {
    try {
        const { course_id, sec_id, sem , year} = req.body;
        const student_id = req.session.uID;

        const result = await pool.query(
            "DELETE FROM takes WHERE ID = $1 AND course_id = $2 AND sec_id = $3 AND semester = $4 AND year = $5;",
            [student_id, course_id, sec_id, sem, year]
        )

        return res.status(200).json({ message: "Course was dropped" })

    } catch (err) {
        return res
            .status(500)
            .json({ message: "Couldn't drop the course" });
    }
}

module.exports = {
    register_course,
    drop_course
}