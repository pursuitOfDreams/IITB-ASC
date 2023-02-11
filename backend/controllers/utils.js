const pool = require("../db")
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// var date = yyyy + '-' + mm + '-' + dd;

const getCurrentSem = async (req, res) => {
    

    try {
        var today = new Date();
        const result = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result.rows[0].year;
        const sem = result.rows[0].semester;
        console.log("year:",curr_year)
        console.log("sem:",curr_sem)
        return res.status(200).json({ year : curr_year, sem: curr_sem})
    }
    catch (err) {
        return {
            
        }
    }
}

module.exports = {
    getCurrentSem
}