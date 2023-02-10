const jwt = require('jsonwebtoken')
const pool = require("../db")
const bcrypt = require("bcrypt")

const checkAuth = (req, res, next) => {
  const token = req.headers['x-auth-token']
  console.log(req.originalUrl)
  if (!token) return res.status(401).json({ message: 'Failed to authenticate' })
  jwt.verify(token, "private", (err, data) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate' })
    console.log(data)
    req.user = { id: data.user }
    next()
  })
}

const loginUser = async (req, res) => {
  try{
    console.log(req.body)
    const { student_id, password} = req.body;
    console.log(student_id)
    const user_credentials = await pool.query(
        "SELECT student.ID, name, hashed_password  FROM student, user_password WHERE student.ID = user_password.ID AND student.ID = $1;",
        [student_id]
    )
    if (user_credentials.rows.length == 0){
      // then no such user exist
      return res.status(401).json("Password or username is incorrect, please reenter");
    }
    const user_password = user_credentials.rows[0].hashed_password;
    const username = user_credentials.rows[0].name;
    const user_id = user_credentials.rows[0].ID;

    const passwordValid = await bcrypt.compare(password, user_password);

    if (!passwordValid) {
      // res.send({message: "Password or userID is Incorrect."})
      return res.status(401).json("Password or userID is Incorrect.");
    }
    const resp = {
      accessToken : '',
      user : {
        id : user_id,
        username : username
      }
    }

    resp.accessToken = jwt.sign({ user: user_id }, "private", {
      expiresIn: '3 days'
    })

     return res.status(200).json(resp);
  } catch(err) {
    console.log(err)
    return res.status(500).send('Server Error');
  }
}


module.exports = {
  checkAuth,
  loginUser
}