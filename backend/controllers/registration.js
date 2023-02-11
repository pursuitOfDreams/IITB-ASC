// defines the logic for registration and dropping of course

const pool = require("../db")


const registerCourse = async (req, res) => {
    try{
        const { user_id, course_id, sec_i } = req.body;
        const course = await pool.query(
            "SELECT * FROM course WHERE course_id = $1",
            [course_id]
        )
        const result = await pool.query(
            "INSERT INTO takes VALUES ($1,",
            []
        )
    }
    catch (err){

    }
}