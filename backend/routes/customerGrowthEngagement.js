const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const CustomerGrowthEngagement = require("../models/CustomerGrowthEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await CustomerGrowthEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer growth" });
  }
});
module.exports = router;
