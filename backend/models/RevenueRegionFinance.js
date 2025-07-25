const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  region: String,
  revenue: String
});
module.exports = mongoose.model("RevenueRegionFinance", schema);
