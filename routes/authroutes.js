const {
    signup,
    login
} = require('../controllers/authcontroller');
const express = require('express');
const router = express.Router();

// routes
router.post('/signup', signup);
router.post('/login', login);



module.exports = router;