const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  label: String,
  score: String
});
module.exports = mongoose.model("SatisfactionCardsEngagement", schema);
