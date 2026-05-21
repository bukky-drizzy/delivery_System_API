const jwt = require('jsonwebtoken');


// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
    id: user._id,
    role: user.role,
    email: user.email
  },
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
  );
<<<<<<< HEAD
};

module.exports = generateToken;
=======
};
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353
