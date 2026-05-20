const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const protectedroute = require('../middlewares/authMiddleware');

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

// Get logged-in user profile
router.get('/profile', protectedroute, userController.getUserProfile);

// Update logged-in user profile
router.put('/profile', protectedroute, userController.updateUserProfile);

// Change password
router.put('/change-password', protectedroute, userController.changePassword);

// Logout user
router.post('/logout', protectedroute, userController.logoutUser);

module.exports = router;