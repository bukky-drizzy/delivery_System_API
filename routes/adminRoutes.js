const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const { protectAdmin, authorizeRoles } = require('../middlewares/authMiddleware');

// Public Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected Routes (Only authenticated admins can access)
router.get('/profile', protectAdmin, (req, res) => {
    res.json({ success: true, data: req.admin });
});

// Example: Only Super Admin can access this
router.get('/all-users', protectAdmin, authorizeRoles('superadmin'), (req, res) => {
    res.json({ message: "All users fetched by superadmin" });
});

module.exports = router;