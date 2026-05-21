const adminService = require('../services/adminService');

const registerAdmin = async (req, res) => {
    try {
        const admin = await adminService.registerAdmin(req.body);
        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { admin, token } = await adminService.loginAdmin(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const getAdminProfile = async (req, res) => {
    try {
        const admin = await adminService.getAdminById(req.user.id);
        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminProfile
};