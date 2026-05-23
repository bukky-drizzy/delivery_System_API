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
const {protect, authorize} = require("../middlewares/authmiddleware");


// PUBLIC
router.post("/", createOrder);



// PROTECTED
router.get("/", protect, authorize(["admin", "user"]), getAllOrders);

router.get("/history", protect, authorize(["admin", "user"]), getOrderHistory);

router.patch("/:id/status", protect, authorize(["admin"]), updateOrderStatus);

router.patch("/:id/proof", protect, authorize(["admin", "user"]), upload.single("proof"), uploadProofOfDelivery);

router.patch("/:id/damage", protect, authorize(["admin", "user"]), upload.single("damage"), uploadDamageReport);

module.exports = router;