const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const AvgConsultDoctors = require("../models/AvgConsultDoctors");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await AvgConsultDoctors.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch consultation card" });
  }
});
module.exports = router;
