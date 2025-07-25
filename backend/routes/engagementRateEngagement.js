const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const EngagementRateEngagement = require("../models/EngagementRateEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await EngagementRateEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch engagement rate" });
  }
});
module.exports = router;
