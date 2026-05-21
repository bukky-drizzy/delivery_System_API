const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    getProfile 
} = require('../controllers/userController');

const protectedroute = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.get('/profile', protectedroute, getProfile);

// Example: Only Admin can access this
router.get('/all', protectedroute, roleMiddleware('admin', 'superadmin'), async (req, res) => {
    // You can implement get all users later
    res.json({ message: "All users route - to be implemented" });
});

module.exports = router;