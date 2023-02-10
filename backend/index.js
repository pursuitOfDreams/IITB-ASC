const express = require('express');
const app = express();
const AppRouter = require('./routes/index')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

// Middleware
app.use(express.json())
app.use(cors());

app.use('/api/', AppRouter);


app.listen(3001, () => {
    console.log("server has started on port 3001");
});