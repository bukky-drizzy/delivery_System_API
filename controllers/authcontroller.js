const jwt = require('../configs/jwt');
const User = require('../models/user');
<<<<<<< HEAD
const bcrypt = require("bcryptjs");

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
=======
const bcrypt = require('bcrypt');
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353

// signup controller
const signup = async (req, res) => {
  try {
<<<<<<< HEAD
    const { name, email, password, phone } = req.body;
=======
    const { name, email, password } = req.body;
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353

    // Send response
    res.status(201).json({
      token,
      user: {
<<<<<<< HEAD
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
=======
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
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353
    });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
<<<<<<< HEAD
    const user = await User.findOne({ email }).select("+password");
=======
    const user = await User.findOne({ email });
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353

    // Check user
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
<<<<<<< HEAD
    } 
=======
    }
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Generate token
<<<<<<< HEAD
   const token = jwt(user);
=======
    const token = jwt.generateToken(user);
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353

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

<<<<<<< HEAD
  } catch (err) {
    console.error(err);
=======
  } catch (error) {
    console.error(error);
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353

    res.status(500).json({
      message: 'Server error'
    });
  }
};

<<<<<<< HEAD
=======


>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353
module.exports = {
  signup,
  login
};