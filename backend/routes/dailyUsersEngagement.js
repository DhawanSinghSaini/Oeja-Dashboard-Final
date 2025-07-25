const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const DailyUsersEngagement = require("../models/DailyUsersEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await DailyUsersEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch daily users" });
  }
});
module.exports = router;
