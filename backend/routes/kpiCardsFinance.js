const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const KpiCardFinance = require("../models/KpiCardFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const cards = await KpiCardFinance.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch KPI cards" });
  }
});

module.exports = router;
