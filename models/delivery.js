const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        select: false          // Never return password in queries
    },

    role: {
        type: String,
        enum: ['customer', 'business', 'rider', 'admin'],
        default: 'customer'
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;