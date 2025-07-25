const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const ChurnRateEngagement = require("../models/ChurnRateEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await ChurnRateEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch churn rate" });
  }
});
module.exports = router;
