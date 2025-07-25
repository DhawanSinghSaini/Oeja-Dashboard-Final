const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const ActivationFunnelEngagement = require("../models/ActivationFunnelEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await ActivationFunnelEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activation funnel" });
  }
});
module.exports = router;
