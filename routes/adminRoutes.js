const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getDeliveryStats,
  getUsersByRole,
  getDeliveriesWithFilter,
} = require("../controllers/adminController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// All routes are ADMIN ONLY
router.use(protect, authorize("admin"));

// Dashboard
router.get("/stats", getDashboardStats);
router.get("/delivery-stats", getDeliveryStats);

// Users
router.get("/users", getUsersByRole);

// Deliveries
router.get("/deliveries", getDeliveriesWithFilter);

module.exports = router;