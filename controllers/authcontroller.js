const jwt = require('../configs/jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// signup controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role:  'user'
    });

    // Save user
    await newUser.save();

    // Generate token
    const token = jwt.generateToken(newUser);

    // Send response
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Check user
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.generateToken(user);

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};



module.exports = {
  signup,
  login
};