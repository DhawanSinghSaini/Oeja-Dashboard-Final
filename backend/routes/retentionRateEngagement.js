const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const RetentionRateEngagement = require("../models/RetentionRateEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await RetentionRateEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch retention rate" });
  }
});
module.exports = router;
