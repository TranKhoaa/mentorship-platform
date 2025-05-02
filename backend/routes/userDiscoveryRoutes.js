const express = require("express");
const router = express.Router();
const { getAllProfiles } = require("../controllers/userDiscoveryController");
const authenticateToken = require("../controllers/authMiddleware");

router.get("/", authenticateToken, getAllProfiles);

module.exports = router;
