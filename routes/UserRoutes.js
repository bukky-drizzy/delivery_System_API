const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  getMe,
  updateUser,
  deleteUser,
  setUserRole,
} = require("../controllers/userController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// Logged-in user profile
router.get("/me", protect, getMe);

// Admin: get all users
router.get("/", protect, authorize("admin"), getUsers);

// Get single user
router.get("/:id", protect, getUserById);

// Update user (self or admin)
router.patch("/:id", protect, updateUser);

// Delete user (admin only)
router.delete("/:id", protect, authorize("admin"), deleteUser);

// Set role (admin only)
router.patch("/:id/role", protect, authorize("admin"), setUserRole);

module.exports = router;