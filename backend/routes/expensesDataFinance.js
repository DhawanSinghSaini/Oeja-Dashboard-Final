const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const ExpensesDataFinance = require("../models/ExpensesDataFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await ExpensesDataFinance.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses data" });
  }
});

module.exports = router;
