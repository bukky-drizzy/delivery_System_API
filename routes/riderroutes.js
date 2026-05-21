const express = require("express");

const router = express.Router();

const {
  registerRider,
  loginRider,
  getAllRiders,
  getSingleRider,
  updateAvailability,
  updateDeliveryStatus,
  updateLocation,
  deleteRider,
} = require("../controllers/ridercontroller");
const protectedRoute = require("../middlewares/authMiddleware");
const rolemiddleware = require("../middlewares/roleMiddleware");



router.post("/signup", registerRider);

router.post("/login", loginRider);

router.get("/",  protectedRoute, rolemiddleware() , getAllRiders);

router.get("/:id", protectedRoute, rolemiddleware(), getSingleRider);

router.patch("/:id/availability", protectedRoute, rolemiddleware(), updateAvailability);

router.patch("/:id/delivery-status", protectedRoute, rolemiddleware(), updateDeliveryStatus);

router.patch("/:id/location", protectedRoute, rolemiddleware(), updateLocation);

router.delete("/:id", protectedRoute, rolemiddleware(), deleteRider);

module.exports = router;