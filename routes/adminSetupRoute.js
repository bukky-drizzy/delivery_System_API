const express = require("express");
const router = express.Router();

const { createFirstAdmin } = require("../controllers/adminController");

router.post("/setup-admin", createFirstAdmin);

module.exports = router;