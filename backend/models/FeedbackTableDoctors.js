const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  doctor: String,
  rating: String,
  comment: String
});
module.exports = mongoose.model("FeedbackTableDoctors", schema);
