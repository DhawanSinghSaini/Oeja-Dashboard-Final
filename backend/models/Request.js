const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: String,
  email: String,
  role: String,
  licenseNumber: String,
  licenseExpiry: Date,
  organization: String,
  identityScanUrl: String,
  licenseScanUrl: String,
  status: { type: String, default: "pending" }, // approve / reject / info
  adminComment: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
