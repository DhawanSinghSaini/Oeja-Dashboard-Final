const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const RefundDataFinance = require("../models/RefundDataFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await RefundDataFinance.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch refund data" });
  }
});

module.exports = router;
