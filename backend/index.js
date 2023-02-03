const express = require('express');
const AppRouter = require('./routes/index')
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(session({
        resave : true,
        saveUninitialized: true,
        secret : "secret"
}));

// Middleware
app.use(express.json())
app.use(cors());

app.use('/api/', AppRouter);


app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});