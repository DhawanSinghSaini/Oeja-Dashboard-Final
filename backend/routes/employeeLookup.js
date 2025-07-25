const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const Employee = require("../models/Employee");

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching employee" });
  }
});

module.exports = router;
