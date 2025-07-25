const mongoose = require("mongoose");
require("dotenv").config();

// Load Models
const KpiCardFinance = require("./models/KpiCardFinance");
const MrrDataFinance = require("./models/MrrDataFinance");
const AvgRevenueFinance = require("./models/AvgRevenueFinance");
const PaymentMethodFinance = require("./models/PaymentMethodFinance");
const RefundDataFinance = require("./models/RefundDataFinance");
const ExpensesDataFinance = require("./models/ExpensesDataFinance");
const ProfitMarginFinance = require("./models/ProfitMarginFinance");
const RevenueRegionFinance = require("./models/RevenueRegionFinance");
const OutstandingInvoiceFinance = require("./models/OutstandingInvoiceFinance");

// Sample Data Sets
const kpiCards = [
  { title: "Monthly Recurring Revenue", value: "₹5.8L", period: "This month", growth: 6.9 },
  { title: "Yearly Revenue", value: "₹72L", period: "This year", growth: 15.2 },
  { title: "New Subscriptions", value: "1,245", period: "This month", growth: 9.3 },
  { title: "Avg Patient Spend", value: "₹1,654", period: "Current", growth: 4.1 },
];

const mrrData = [
  { label: "Jan", value: 4.2 },
  { label: "Feb", value: 4.6 },
  { label: "Mar", value: 5.0 },
  { label: "Apr", value: 5.4 },
  { label: "May", value: 5.8 },
  { label: "Jun", value: 6.2 },
  { label: "Jul", value: 6.5 },
  { label: "Aug", value: 6.9 },
];

const avgRevenue = [
  {
    label: "Avg. Revenue Per Patient",
    number: "₹1,654",
    icon: "📈",
    color: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
];

const paymentMethods = [
  { label: "UPI", value: 42 },
  { label: "Credit Card", value: 27 },
  { label: "Cash", value: 18 },
  { label: "Net Banking", value: 13 },
  { label: "Wallet", value: 9 },
  { label: "Insurance", value: 5 },
];

const refundData = [
  { label: "Jan", value: 5 },
  { label: "Feb", value: 3 },
  { label: "Mar", value: 6 },
  { label: "Apr", value: 4 },
  { label: "May", value: 2 },
  { label: "Jun", value: 3 },
  { label: "Jul", value: 4 },
  { label: "Aug", value: 3 },
];

const expensesData = [
  { label: "Jan", value: 90 },
  { label: "Feb", value: 85 },
  { label: "Mar", value: 92 },
  { label: "Apr", value: 88 },
  { label: "May", value: 84 },
  { label: "Jun", value: 87 },
  { label: "Jul", value: 91 },
  { label: "Aug", value: 89 },
];

const profitMargins = [
  { label: "Cardiology", value: 42 },
  { label: "Orthopedics", value: 35 },
  { label: "Neurology", value: 38 },
  { label: "Pediatrics", value: 30 },
  { label: "Radiology", value: 33 },
  { label: "General Medicine", value: 29 },
];

const revenueRegions = [
  { region: "Delhi", revenue: "₹1.3L" },
  { region: "Mumbai", revenue: "₹1.1L" },
  { region: "Bengaluru", revenue: "₹98K" },
  { region: "Hyderabad", revenue: "₹75K" },
  { region: "Chennai", revenue: "₹64K" },
  { region: "Kolkata", revenue: "₹51K" },
  { region: "Pune", revenue: "₹47K" },
];

const outstandingInvoices = [
  { region: "Delhi", invoices: 12 },
  { region: "Mumbai", invoices: 9 },
  { region: "Bengaluru", invoices: 7 },
  { region: "Hyderabad", invoices: 4 },
  { region: "Chennai", invoices: 3 },
  { region: "Kolkata", invoices: 6 },
  { region: "Pune", invoices: 5 },
];

// Database Seeding Logic
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("🧼 Clearing existing finance collections...");
    await Promise.all([
      KpiCardFinance.deleteMany({}),
      MrrDataFinance.deleteMany({}),
      AvgRevenueFinance.deleteMany({}),
      PaymentMethodFinance.deleteMany({}),
      RefundDataFinance.deleteMany({}),
      ExpensesDataFinance.deleteMany({}),
      ProfitMarginFinance.deleteMany({}),
      RevenueRegionFinance.deleteMany({}),
      OutstandingInvoiceFinance.deleteMany({}),
    ]);

    console.log("🔁 Inserting fresh finance data...");
    await Promise.all([
      KpiCardFinance.insertMany(kpiCards),
      MrrDataFinance.insertMany(mrrData),
      AvgRevenueFinance.insertMany(avgRevenue),
      PaymentMethodFinance.insertMany(paymentMethods),
      RefundDataFinance.insertMany(refundData),
      ExpensesDataFinance.insertMany(expensesData),
      ProfitMarginFinance.insertMany(profitMargins),
      RevenueRegionFinance.insertMany(revenueRegions),
      OutstandingInvoiceFinance.insertMany(outstandingInvoices),
    ]);

    console.log("✅ Finance data seeded successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
  });
