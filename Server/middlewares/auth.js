const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    //if token is missing then return res
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      //verification - issue
      return res.status(401).json({
        success: false,
        token: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      res.status(401).json({
        success: false,
        message: "This is protected route for students only",
      });
    }
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      messagee: "User role cannot be verified",
    });
  }
};

//isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      res.status(401).json({
        success: false,
        message: "This is protected route for Instructor only",
      });
    }
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      messagee: "User role cannot be verified",
    });
  }
};

//isAdmin

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      res.status(401).json({
        success: false,
        message: "This is protected route for Admin only",
      });
    }
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      messagee: "User role cannot be verified",
    });
  }
};
