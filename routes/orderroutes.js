const express = require("express");

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  trackOrder,
  updateOrderStatus,
  getOrderHistory,
} = require("../controllers/ordercontroller");

const protectedRoute = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware");


// PUBLIC
router.post("/", createOrder);



// PROTECTED
router.get("/", protectedRoute, roleMiddleware(["admin", "user"]), getAllOrders);

router.get(
  "/history", protectedRoute, roleMiddleware(["admin", "user"]), getOrderHistory
);

router.patch(
  "/:id/status", protectedRoute, roleMiddleware(["admin"]), updateOrderStatus
);

module.exports = router;