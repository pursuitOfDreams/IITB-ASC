const pool = require("../db")


const getCurrentSem = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const curr_year = result.rows[0].year;
        const curr_sem = result.rows[0].sem;

        return {
            year : curr_year,
            sem : curr_sem
        }
    }
    catch (err) {
        return {
            
        }
    }
}

module.exports = {
    getCurrentSem
}