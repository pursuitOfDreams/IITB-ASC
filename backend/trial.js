var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var date = yyyy + '-' + mm + '-' + dd;

const pool = require("./db")
const f = async () => {
    var today = new Date();
        const result1 = await pool.query(
            "SELECT * FROM reg_dates WHERE start_time <= $1  ORDER BY start_time DESC;",
            [today]
        );
        const year = result1.rows[0].year;
        const sem = result1.rows[0].semester;
        
    const result = await pool.query(
        "SELECT * FROM takes WHERE ;",
        [today]
    )
    
    console.log(result.rows[0])
}

