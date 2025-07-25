const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const ArpuEngagement = require("../models/ArpuEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await ArpuEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ARPU data" });
  }
});
module.exports = router;
