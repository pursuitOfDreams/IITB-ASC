const jwt = require('jsonwebtoken')
const pool = require("../db")
const bcrypt = require("bcrypt")

const checkAuth = (req, res, next) => {
  if(req.session.isLoggedin){

  }
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
    const { student_id, password} = req.body;
    const user_credentials = await pool.query(
        "SELECT student.ID, name, hashed_password  FROM student, user_password WHERE student.ID = user_password.ID AND student.ID = $1;",
        [student_id]
    )
    if (user_credentials.rows.length == 0){
      return res.status(401).json("Password or username is incorrect, please reenter");
    }
    const user_password = user_credentials.rows[0].hashed_password;
    const username = user_credentials.rows[0].name;
    const user_id = user_credentials.rows[0].id;

    const passwordValid = await bcrypt.compare(password, user_password);

    if (!passwordValid) {
      return res.status(401).json("Password or userID is Incorrect.");
    }

    console.log('a', req.session)

    req.session.isLoggedin = true
    req.session.uID = user_id

    console.log('b', req.session)

    return req.session.save((err)=>{
      console.log(err),
      res.send({ message :`ok` })
    })

  } catch(err) {
    return res.status(500).send('Server Error');
  }
}

const logout = async (req,res) => {
  req.session.isLoggedin = false
  return 
}


module.exports = {
  checkAuth,
  loginUser,
  logout
}