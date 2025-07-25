const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const verifyToken = require("../middleware/verifyToken"); // adjust path if needed

// Protected: Get all requests
router.get("/", verifyToken, async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching requests" });
  }
});

// Protected: Update request
router.patch("/:id", verifyToken, async (req, res) => {
  const { status, adminComment } = req.body;
  try {
    const updated = await Request.findOneAndUpdate(
      { id: req.params.id },
      { status, adminComment },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Request not found." });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating request." });
  }
});

module.exports = router;