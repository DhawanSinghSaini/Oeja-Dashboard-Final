const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  reason: String,
  count: Number
});
module.exports = mongoose.model("CancellationTableDoctors", schema);
