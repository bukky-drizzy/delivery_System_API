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