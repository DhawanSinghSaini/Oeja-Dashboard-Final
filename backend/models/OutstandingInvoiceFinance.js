const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  region: String,
  invoices: Number
});
module.exports = mongoose.model("OutstandingInvoiceFinance", schema);
