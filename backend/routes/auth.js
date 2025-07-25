const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔐 Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Validate password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Issue token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ token }); // 🔐 No user info returned
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// 🔓 Logout route
router.post("/logout", (req, res) => {
  // You could do token auditing or logging here if needed
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
