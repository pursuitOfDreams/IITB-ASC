var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var date = yyyy + '-' + mm + '-' + dd;

const pool = require("./db")
const f = async () => {
    const result = await pool.query(
        "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
        [today]
    )
    
    console.log(result.rows[0])
}

