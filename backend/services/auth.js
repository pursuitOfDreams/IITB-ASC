const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    const token = req.header['x-auth-token'];
    console.log("Token", token)
    if (!token) return res.status(401).json({ message : 'Failed to auuthenticate'})
    jwt.verify(token, process.env.JWT_PRIVATE, (err, data) =>{
        if (err) return res.status(500).json({message : 'Failed to authenticate'});
        console.log(data);
        req.user = { id : data.user };
        next();
    })
}


module.exports = checkAuth;