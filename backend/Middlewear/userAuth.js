const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader, "Middleware one");
    
    const authToken = authHeader && authHeader.split(" ")[1];
    console.log("Auth Token:", authToken, "Middleware two");

    if (!authToken) {
      return res.status(401).json({
        loginfail: true,
        status: false,
        message: "No auth token",
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret key is not defined in environment variables.");
    }

    const decoded = jwt.verify(authToken, secret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized access",
        status: false,
        loginfail: true,
      });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized access",
      status: false,
      loginfail: true,
    });
  }
};
