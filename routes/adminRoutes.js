const express = require('express');
const router = express.Router();

const { 
    registerAdmin, 
    loginAdmin, 
    getAdminProfile 
} = require('../controllers/adminController');

const protectedroute = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// ====================== PUBLIC ROUTES ======================
router.post('/register', registerAdmin);     // Register new admin
router.post('/login', loginAdmin);           // Login admin

// ====================== PROTECTED ROUTES ======================

// Get Admin Profile (Any logged-in admin)
router.get('/profile', protectedroute, getAdminProfile);

// Example: Only Super Admin can access these
router.get('/dashboard', protectedroute, roleMiddleware('superadmin'), (req, res) => {
    res.json({ message: "Super Admin Dashboard" });
});

// Get all users (Super Admin & Dispatcher)
router.get('/users', protectedroute, roleMiddleware('superadmin', 'dispatcher'), (req, res) => {
    res.json({ message: "All users - to be implemented" });
});

// Approve Rider (Admin levels)
router.put('/approve-rider/:id', protectedroute, roleMiddleware('superadmin', 'dispatcher'), (req, res) => {
    res.json({ message: "Rider approval route - to be implemented" });
});

module.exports = router;