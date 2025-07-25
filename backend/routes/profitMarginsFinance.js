const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const ProfitMarginFinance = require("../models/ProfitMarginFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const margins = await ProfitMarginFinance.find();
    res.json(margins);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profit margins" });
  }
});

module.exports = router;
