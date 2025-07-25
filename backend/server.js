const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🛡️ Middleware
app.use(cors());
app.use(express.json());

// 🔐 Authentication Route
app.use("/api", require("./routes/auth"));

// 📊 Finance Routes (secured via verifyToken in each route file)
app.use("/api/kpi-cards-finance", require("./routes/kpiCardsFinance"));
app.use("/api/mrr-data-finance", require("./routes/mrrDataFinance"));
app.use("/api/avg-revenue-finance", require("./routes/avgRevenueFinance"));
app.use("/api/payment-methods-finance", require("./routes/paymentMethodsFinance"));
app.use("/api/refund-data-finance", require("./routes/refundDataFinance"));
app.use("/api/expenses-data-finance", require("./routes/expensesDataFinance"));
app.use("/api/profit-margins-finance", require("./routes/profitMarginsFinance"));
app.use("/api/revenue-regions-finance", require("./routes/revenueRegionsFinance"));
app.use("/api/outstanding-invoices-finance", require("./routes/outstandingInvoicesFinance"));

// 📈 Engagement Routes
app.use("/api/new-accounts-engagement", require("./routes/newAccountsEngagement"));
app.use("/api/arpu-engagement", require("./routes/arpuEngagement"));
app.use("/api/activation-funnel-engagement", require("./routes/activationFunnelEngagement"));
app.use("/api/daily-users-engagement", require("./routes/dailyUsersEngagement"));
app.use("/api/monthly-users-engagement", require("./routes/monthlyUsersEngagement"));
app.use("/api/engagement-rate-engagement", require("./routes/engagementRateEngagement"));
app.use("/api/satisfaction-cards-engagement", require("./routes/satisfactionCardsEngagement"));
app.use("/api/churn-rate-engagement", require("./routes/churnRateEngagement"));
app.use("/api/retention-rate-engagement", require("./routes/retentionRateEngagement"));
app.use("/api/arpu-trend-engagement", require("./routes/arpuTrendEngagement"));
app.use("/api/customer-growth-engagement", require("./routes/customerGrowthEngagement"));

// 🩺 Doctor Routes
app.use("/api/kpi-doctors", require("./routes/kpiDoctors"));
app.use("/api/doctor-trend-doctors", require("./routes/doctorTrendDoctors"));
app.use("/api/avg-consult-doctors", require("./routes/avgConsultDoctors"));
app.use("/api/fulfillment-rate-doctors", require("./routes/fulfillmentRateDoctors"));
app.use("/api/feedback-average-doctors", require("./routes/feedbackAverageDoctors"));
app.use("/api/feedback-table-doctors", require("./routes/feedbackTableDoctors"));
app.use("/api/cancellation-reasons-doctors", require("./routes/cancellationReasonsDoctors"));
app.use("/api/cancellation-table-doctors", require("./routes/cancellationTableDoctors"));

// 👨🏻‍💻 Fetch Employee Details
app.use("/api/employee-by-id", require("./routes/employeeLookup"));

// 👮 Fetch Admin Details
app.use("/api/users", require("./routes/users"));

// Fetch Onboarding request.
app.use("/api/requests", require("./routes/requests"));

// 🧪 Health Check
app.get("/", (req, res) => {
  res.send("🚀 Finance backend is up and running.");
});

// ⚙️ Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`✅ Server live at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
