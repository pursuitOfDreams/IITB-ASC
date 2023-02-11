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

INSERT INTO reg_dates (year, semester, start_time, end_time)
VALUES 
  (2009, 'Fall', '2022-08-01 10:00:00', '2022-12-31 12:00:00'),
  (2009, 'Spring', '2022-01-01 10:00:00', '2022-04-30 12:00:00'),
  (2010, 'Fall', '2023-09-01 10:00:00', '2023-12-31 12:00:00'),
  (2010, 'Spring', '2023-01-01 10:00:00', '2023-04-30 12:00:00'),

  (2007, 'Fall', '2020-08-01 10:00:00', '2020-12-31 12:00:00'),
  (2007, 'Spring', '2020-01-01 10:00:00', '2020-04-30 12:00:00'),
  (2008, 'Fall', '2021-09-01 10:00:00', '2021-12-31 12:00:00'),
  (2008, 'Spring', '2021-01-01 10:00:00', '2021-04-30 12:00:00'),

  (2005, 'Fall', '2018-08-01 10:00:00', '2018-12-31 12:00:00'),
  (2005, 'Spring', '2018-01-01 10:00:00', '2018-04-30 12:00:00'),
  (2006, 'Fall', '2019-09-01 10:00:00', '2019-12-31 12:00:00'),
  (2006, 'Spring', '2019-01-01 10:00:00', '2019-04-30 12:00:00');
