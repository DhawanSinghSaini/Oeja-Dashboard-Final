const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const RevenueRegionFinance = require("../models/RevenueRegionFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const regions = await RevenueRegionFinance.find();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch revenue regions" });
  }
});

module.exports = router;
