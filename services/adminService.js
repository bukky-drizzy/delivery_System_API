const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminService = {
    // Register Admin
    async registerAdmin(adminData) {
        const { fullName, email, password, phoneNumber, role } = adminData;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            throw new Error('Admin already exists with this email');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role: role || 'dispatcher'
        });

        await admin.save();
        return admin;
    },

    // Login Admin
    async loginAdmin(email, password) {
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        admin.lastLogin = Date.now();
        await admin.save();

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { admin, token };
    },

    // Get Admin by ID
    async getAdminById(id) {
        return await Admin.findById(id).select('-password');
    }
};

module.exports = adminService;