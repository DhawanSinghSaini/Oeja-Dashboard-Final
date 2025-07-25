const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: String,
  value: String,
  period: String,
  growth: Number
});
module.exports = mongoose.model("NewAccountsEngagement", schema);
