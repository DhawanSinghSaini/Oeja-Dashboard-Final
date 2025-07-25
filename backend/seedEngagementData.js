const mongoose = require("mongoose");
require("dotenv").config();

// Models
const NewAccountsEngagement = require("./models/NewAccountsEngagement");
const ArpuEngagement = require("./models/ArpuEngagement");
const ActivationFunnelEngagement = require("./models/ActivationFunnelEngagement");
const DailyUsersEngagement = require("./models/DailyUsersEngagement");
const MonthlyUsersEngagement = require("./models/MonthlyUsersEngagement");
const EngagementRateEngagement = require("./models/EngagementRateEngagement");
const SatisfactionCardsEngagement = require("./models/SatisfactionCardsEngagement");
const ChurnRateEngagement = require("./models/ChurnRateEngagement");
const RetentionRateEngagement = require("./models/RetentionRateEngagement");
const ArpuTrendEngagement = require("./models/ArpuTrendEngagement");
const CustomerGrowthEngagement = require("./models/CustomerGrowthEngagement");

// Data Sets
const newAccounts = [
  { title: "New Customer Accounts", value: "1,845", period: "This month", growth: 7.2 },
];

const arpuCard = [
  {
    label: "ARPU (Avg. Revenue Per User)",
    number: "₹1,182",
    icon: "💰",
    color: "bg-yellow-100",
    textColor: "text-yellow-700",
  },
];

const activationFunnel = [
  { label: "Site Visit", value: 8200 },
  { label: "Account Created", value: 3600 },
  { label: "Activated", value: 2300 },
];

const dailyUsers = [
  { label: "Mon", value: 540 },
  { label: "Tue", value: 610 },
  { label: "Wed", value: 580 },
  { label: "Thu", value: 670 },
  { label: "Fri", value: 720 },
  { label: "Sat", value: 690 },
  { label: "Sun", value: 620 },
];

const monthlyUsers = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 4620 },
  { label: "Mar", value: 5050 },
  { label: "Apr", value: 5420 },
  { label: "May", value: 5810 },
  { label: "Jun", value: 6120 },
];

const engagementRate = [
  { label: "Delhi", value: 88 },
  { label: "Mumbai", value: 85 },
  { label: "Bengaluru", value: 82 },
  { label: "Hyderabad", value: 80 },
];

const satisfactionCards = [
  { label: "Support Experience", score: "4.7" },
  { label: "Ease of Use", score: "4.6" },
  { label: "Feature Satisfaction", score: "4.4" },
];

const churnRate = [
  { label: "Jan", value: 8 },
  { label: "Feb", value: 7.2 },
  { label: "Mar", value: 6.5 },
  { label: "Apr", value: 6.9 },
  { label: "May", value: 6.2 },
  { label: "Jun", value: 5.8 },
];

const retentionRate = [
  { label: "Jan", value: 58 },
  { label: "Feb", value: 62 },
  { label: "Mar", value: 67 },
  { label: "Apr", value: 71 },
  { label: "May", value: 73 },
  { label: "Jun", value: 75 },
];

const arpuTrend = [
  { label: "Jan", value: 1025 },
  { label: "Feb", value: 1090 },
  { label: "Mar", value: 1154 },
  { label: "Apr", value: 1185 },
  { label: "May", value: 1200 },
  { label: "Jun", value: 1182 },
];

const customerGrowth = [
  { label: "Jan", value: 1280 },
  { label: "Feb", value: 1422 },
  { label: "Mar", value: 1570 },
  { label: "Apr", value: 1705 },
  { label: "May", value: 1845 },
  { label: "Jun", value: 1980 },
];

// Seed Script
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("🧼 Clearing old engagement collections...");
    await Promise.all([
      NewAccountsEngagement.deleteMany({}),
      ArpuEngagement.deleteMany({}),
      ActivationFunnelEngagement.deleteMany({}),
      DailyUsersEngagement.deleteMany({}),
      MonthlyUsersEngagement.deleteMany({}),
      EngagementRateEngagement.deleteMany({}),
      SatisfactionCardsEngagement.deleteMany({}),
      ChurnRateEngagement.deleteMany({}),
      RetentionRateEngagement.deleteMany({}),
      ArpuTrendEngagement.deleteMany({}),
      CustomerGrowthEngagement.deleteMany({}),
    ]);

    console.log("📦 Inserting new engagement data...");
    await Promise.all([
      NewAccountsEngagement.insertMany(newAccounts),
      ArpuEngagement.insertMany(arpuCard),
      ActivationFunnelEngagement.insertMany(activationFunnel),
      DailyUsersEngagement.insertMany(dailyUsers),
      MonthlyUsersEngagement.insertMany(monthlyUsers),
      EngagementRateEngagement.insertMany(engagementRate),
      SatisfactionCardsEngagement.insertMany(satisfactionCards),
      ChurnRateEngagement.insertMany(churnRate),
      RetentionRateEngagement.insertMany(retentionRate),
      ArpuTrendEngagement.insertMany(arpuTrend),
      CustomerGrowthEngagement.insertMany(customerGrowth),
    ]);

    console.log("✅ Engagement data seeded successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
  });
