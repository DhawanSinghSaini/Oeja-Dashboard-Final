const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  label: String,
  value: Number
});
module.exports = mongoose.model("MonthlyUsersEngagement", schema);
