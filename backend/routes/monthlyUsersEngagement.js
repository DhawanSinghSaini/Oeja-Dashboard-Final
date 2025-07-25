const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const MonthlyUsersEngagement = require("../models/MonthlyUsersEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await MonthlyUsersEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch monthly users" });
  }
});
module.exports = router;
