const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = {
    // Register New User
    async registerUser(userData) {
        const { fullName, email, password, phoneNumber, role } = userData;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role: role || 'customer'
        });

        await user.save();
        return user;
    },

    // Login User
    async loginUser(email, password) {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { user, token };
    },

    // Get User Profile
    async getUserById(id) {
        return await User.findById(id).select('-password');
    }
};

module.exports = userService;