const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const AvgRevenueFinance = require("../models/AvgRevenueFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const card = await AvgRevenueFinance.find();
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch average revenue" });
  }
});

module.exports = router;
