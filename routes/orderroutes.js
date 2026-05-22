const express = require("express");

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  trackOrder,
  updateOrderStatus,
  getOrderHistory,
  uploadProofOfDelivery,
  uploadDamageReport
} = require("../controllers/ordercontroller");
const upload = require("../middlewares/upload");
const protectedRoute = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware");


// PUBLIC
router.post("/", createOrder);



// PROTECTED
router.get("/", protectedRoute, roleMiddleware(["admin", "user"]), getAllOrders);

router.get("/history", protectedRoute, roleMiddleware(["admin", "user"]), getOrderHistory);

router.patch("/:id/status", protectedRoute, roleMiddleware(["admin"]), updateOrderStatus);

router.patch("/:id/proof", protectedRoute, roleMiddleware(["admin", "user"]), upload.single("proof"), uploadProofOfDelivery);

router.patch("/:id/damage", protectedRoute, roleMiddleware(["admin", "user"]), upload.single("damage"), uploadDamageReport);

module.exports = router;