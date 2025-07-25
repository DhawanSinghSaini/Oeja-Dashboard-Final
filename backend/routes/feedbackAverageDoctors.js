const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const FeedbackAverageDoctors = require("../models/FeedbackAverageDoctors");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await FeedbackAverageDoctors.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedback average" });
  }
});
module.exports = router;
