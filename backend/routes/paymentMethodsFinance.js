const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const PaymentMethodFinance = require("../models/PaymentMethodFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const methods = await PaymentMethodFinance.find();
    res.json(methods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payment methods" });
  }
});

module.exports = router;
