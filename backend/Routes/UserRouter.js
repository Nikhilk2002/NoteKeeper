const express= require("express");
const { Signup } = require("../Controller/UserController");
const userAuth=require("../Middlewear/userAuth")
const router = express.Router();


router.post('/signup', userAuth, Signup)



module.exports = router;
