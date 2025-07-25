const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "Secondary",
    enum: ["Primary", "Secondary"]
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
