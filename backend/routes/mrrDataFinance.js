const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const MrrDataFinance = require("../models/MrrDataFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await MrrDataFinance.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch MRR data" });
  }
});

module.exports = router;
