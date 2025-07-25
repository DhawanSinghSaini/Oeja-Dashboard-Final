const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  label: String,
  number: String,
  icon: String,
  color: String,
  textColor: String
});
module.exports = mongoose.model("AvgRevenueFinance", schema);
