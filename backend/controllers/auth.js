const pool = require("../db")
const bcrypt = require("bcrypt")

const checkAuth = (req, res, next) => {
  if (req.session.isLoggedin) {
    next();
  }
  else {
    return res.status(401).json({ message: 'Failed to authenticate' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { student_id, password } = req.body;
    const student_user_credentials = await pool.query(
      "SELECT student.ID, name, hashed_password  FROM student, user_password WHERE student.ID = user_password.ID AND student.ID = $1;",
      [student_id]
    )
    if (student_user_credentials.rows.length > 0) {
      const user_password = student_user_credentials.rows[0].hashed_password;
      const user_id = student_user_credentials.rows[0].id;

      const passwordValid = await bcrypt.compare(password, user_password);

      if (!passwordValid) {
        return res.status(401).json("Password or userID is Incorrect.");
      }
      
      req.session.isLoggedin = true
      req.session.uID = user_id
      req.session.isStudent = true
  
  
      return req.session.save((err) => {
        console.log(err),
          res.send({ message: `ok` })
      })
    }

    const instructor_user_credentials = await pool.query(
      "SELECT instructor.ID, name, hashed_password  FROM instructor, user_password WHERE instructor.ID = user_password.ID AND instructor.ID = $1;",
      [student_id]
    )

  
    if (student_user_credentials.rows.length == 0 && instructor_user_credentials.rows.length == 0) {
      return res.status(401).json("Password or username is incorrect, please reenter");
    }

    

    const user_password = instructor_user_credentials.rows[0].hashed_password;
    const user_id = instructor_user_credentials.rows[0].id;

    const passwordValid = await bcrypt.compare(password, user_password);

    if (!passwordValid) {
      return res.status(401).json("Password or userID is Incorrect.");
    }

    req.session.isLoggedin = true
    req.session.uID = user_id
    req.session.isStudent = false


    return req.session.save((err) => {
      console.log(err),
        res.send({ message: `ok` })
    })

  } catch (err) {
    console.log(err)
    return res.status(500).send('Server Error');
  }
}

const logout = async (req, res) => {
  req.session.isLoggedin = false
  req.session.isStudent = false
  req.session.destroy()
  return
}


module.exports = {
  checkAuth,
  loginUser,
  logout
}