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
const {protect, authorize} = require("../middlewares/authmiddleware");




router.post("/signup", registerRider);

router.post("/login", loginRider);

router.get("/",  protect, authorize() , getAllRiders);

router.get("/:id", protect, authorize() , getSingleRider);

router.patch("/:id/availability", protect, authorize() , updateAvailability);

router.patch("/:id/location", protect, authorize() , updateLocation);

router.delete("/:id", protect, authorize() , deleteRider);

module.exports = router;