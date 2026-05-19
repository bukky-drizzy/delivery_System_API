const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// Admin Authentication Middleware
const protectAdmin = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Not authorized, no token provided" 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get admin from database
        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin) {
            return res.status(401).json({ 
                success: false,
                message: "Admin not found" 
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({ 
                success: false,
                message: "Your account has been deactivated" 
            });
        }

        // Attach admin to request object
        req.admin = admin;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ 
            success: false,
            message: "Not authorized, token failed" 
        });
    }
};

// Optional: Middleware to check specific role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.admin.role} is not authorized to access this route`
            });
        }
        next();
    };
};

module.exports = {
    protectAdmin,
    authorizeRoles
};