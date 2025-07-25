const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const OutstandingInvoiceFinance = require("../models/OutstandingInvoiceFinance");

router.get("/", verifyToken, async (req, res) => {
  try {
    const invoices = await OutstandingInvoiceFinance.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch outstanding invoices" });
  }
});

module.exports = router;
