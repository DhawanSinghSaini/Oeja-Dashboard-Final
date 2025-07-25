const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const FulfillmentRateDoctors = require("../models/FulfillmentRateDoctors");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await FulfillmentRateDoctors.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fulfillment rate" });
  }
});
module.exports = router;
