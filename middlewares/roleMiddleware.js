<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};

// Role check
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) not allowed`,
      });
    }
    next();
  };
};
=======
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    // Check if user exists from auth middleware
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353
