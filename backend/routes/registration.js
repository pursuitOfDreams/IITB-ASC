const router = require("express").Router();
const { register_course } = require("../controllers/registration")

router.post("/", register_course)

module.exports ={
    router
}