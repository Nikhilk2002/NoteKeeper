const express = require('express');
const router = express.Router();
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const maxAge = 3 * 24 * 60 * 60;


const createToken = (userId) => {
    const token = jwt.sign({ userId }, "JWT", { expiresIn: maxAge });
    return token;
  };
  
  module.exports.Signup = async (req, res, next) => {
    console.log(req.body, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    const { email, password, name } = req.body
    try {
      const emailExist = await UserModel.findOne({ email: email })
      if (emailExist) {
        return res.json({ message: "Email already exist", status: false })
      }
      const newUser = new UserModel({
        name: name,
        email: email,
        password: password,
  
      });
  
      const userDetails = await (newUser.save());
      const token = createToken(userDetails._id);
      return res.json({
        message: "Account created Successfully",
        status: true,
        token,
      });
    }
  
    catch (err) {
      console.log(err);
      return res.json({
        message: "Internal sever in signup",
        status: false
      });
  
    }
  };