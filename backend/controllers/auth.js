const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  const token = req.headers['x-auth-token']
  if (!token) return res.status(401).json({ message: 'Failed to authenticate' })
  jwt.verify(token, process.env.JWT_PRIVATE, (err, data) => {
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
        "SELECT ID, name, hashed_password  FROM student, user_password WHERE student.ID = user_password AND ID = $1;",
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
      return res.status(401).json("Password or Email is Incorrect.");
    }

    req.session.user = user;
    req.session.save();
    // provide token
     const token = jwtGenerator(user_id);

     return res.json({name, token});
  } catch(err) {
    return res.status(500).send('Server Error');
  }
}

const logoutUser = async (req, res) => {
  req.session.destroy();
}


module.exports = {
  checkAuth
}