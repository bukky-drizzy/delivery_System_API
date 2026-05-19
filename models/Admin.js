const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"]
    },
    role: {
        type: String,
        enum: ['superadmin', 'dispatcher', 'operations'],
        default: 'dispatcher'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, { 
    timestamps: true 
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;