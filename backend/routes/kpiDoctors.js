const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const KpiDoctors = require("../models/KpiDoctors");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await KpiDoctors.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch KPI data" });
  }
});
module.exports = router;
