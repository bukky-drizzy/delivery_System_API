const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: {
        type: String,
        required: true
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
        type: Date
    }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;