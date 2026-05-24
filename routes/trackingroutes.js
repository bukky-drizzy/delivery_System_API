const express = require("express");

const router = express.Router();

const {
  trackOrder,
} = require("../controllers/trackercontroller");


// PUBLIC
router.get("/:trackingId", trackOrder);


module.exports = router;