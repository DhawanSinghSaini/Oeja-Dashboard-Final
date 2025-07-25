const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{3}\d{3}$/ // e.g. FIN123, ENG124
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
    required: true,
    enum: ["Finance", "Engagement", "Doctors", "Operations"]
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
