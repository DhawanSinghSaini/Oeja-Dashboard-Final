const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const ArpuTrendEngagement = require("../models/ArpuTrendEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await ArpuTrendEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ARPU trend" });
  }
});
module.exports = router;
