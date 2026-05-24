const jwt = require('../configs/jwt');
const User = require('../models/user');
const bcrypt = require("bcrypt");

// handling errors
const handleErrors = (err) => {
  let errors = { name: '', email: '', password: '' };

  // checking duplicate enties
  if (err.code === 11000) {
    errors.email = 'Email already in use';

    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// signup controller
const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'user'
    });

    // Generate token
    const token = jwt(user);

    // Send response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);

    const errors = handleErrors(err);

    res.status(500).json({
      errors
    });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");

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
   const token = jwt(user);

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

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  signup,
  login
};