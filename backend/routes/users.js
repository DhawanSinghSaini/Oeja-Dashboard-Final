const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const User = require("../models/User");

// 🚀 GET all users
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude hashed password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 📦 POST: Create new user using employeeId for uniqueness
router.post("/", verifyToken, async (req, res) => {
  try {
    const { employeeId, name, email, department, password, type } = req.body;

    // Validate required fields
    if (!employeeId || !name || !email || !department || !password) {
      return res.status(400).json({ error: "All fields except 'type' are required" });
    }

    // 🔍 Check if employee already exists by employeeId
    const existing = await User.findOne({ employeeId });
    if (existing) {
      return res.status(409).json({ error: "User with this employee ID already exists" });
    }

    // 🚀 Create new user entry
    const newUser = new User({
      employeeId,
      name,
      email,
      department,
      password, // should be hashed in future
      type: type || "Secondary"
    });

    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("User creation failed:", err.message);
    res.status(500).json({ error: "Error saving user: " + err.message });
  }
});

// DELETE: Remove user by employeeId
router.delete("/:employeeId", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ employeeId: req.params.employeeId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.type === "Primary") {
      return res.status(403).json({ error: "Primary users cannot be revoked" });
    }

    await User.deleteOne({ employeeId: req.params.employeeId });

    res.json({ message: "User access revoked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error revoking user access" });
  }
});



module.exports = router;
