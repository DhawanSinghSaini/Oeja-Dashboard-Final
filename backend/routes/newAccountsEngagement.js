const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const NewAccountsEngagement = require("../models/NewAccountsEngagement");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await NewAccountsEngagement.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch new accounts" });
  }
});
module.exports = router;
