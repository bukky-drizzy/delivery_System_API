const User = require("../models/User");

// Getting all users (ADMIN)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'try again later'});
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'try again later' });
  }
};

// Getting logged-in user profile
exports.getMe = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

// Update user i set this to either (self or admin)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only owner or admin
    if (
      req.user._id.toString() !== user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    User.email = email || User.email;

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'try again later' });
  }
};

// Delete user (ADMIN)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Set role (ADMIN ONLY)
exports.setUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ["user", "admin", "dispatcher", "rider"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin removing themselves
    if (
      req.user._id.toString() === user._id.toString() &&
      role !== "admin"
    ) {
      return res.status(400).json({
        message: "You cannot remove your own admin role",
      });
    }

    user.role = role;
    await user.save();

    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
