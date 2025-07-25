const mongoose = require("mongoose");
require("dotenv").config();

// Load Doctor Models
const KpiDoctors = require("./models/KpiDoctors");
const DoctorTrendDoctors = require("./models/DoctorTrendDoctors");
const AvgConsultDoctors = require("./models/AvgConsultDoctors");
const FulfillmentRateDoctors = require("./models/FulfillmentRateDoctors");
const FeedbackAverageDoctors = require("./models/FeedbackAverageDoctors");
const FeedbackTableDoctors = require("./models/FeedbackTableDoctors");
const CancellationReasonsDoctors = require("./models/CancellationReasonsDoctors");
const CancellationTableDoctors = require("./models/CancellationTableDoctors");

// Sample Data
const kpi = [
  { title: "Active Doctors", value: "42", period: "Monthly average", growth: 1.3 },
];

const doctorTrend = [
  { label: "Jan", value: 34 },
  { label: "Feb", value: 36 },
  { label: "Mar", value: 39 },
  { label: "Apr", value: 41 },
  { label: "May", value: 42 },
  { label: "Jun", value: 43 },
];

const avgConsultCard = [
  {
    label: "Avg. Consultation Duration",
    number: "22 min",
    icon: "⏱️",
    color: "bg-green-100",
    textColor: "text-green-700",
  },
];

const fulfillmentRate = [
  { label: "Cardiology", value: 92 },
  { label: "Neurology", value: 87 },
  { label: "Orthopedics", value: 91 },
  { label: "Pediatrics", value: 89 },
];

const feedbackAverageData = [
  { label: "Jan", value: 4.4 },
  { label: "Feb", value: 4.5 },
  { label: "Mar", value: 4.3 },
  { label: "Apr", value: 4.6 },
  { label: "May", value: 4.7 },
  { label: "Jun", value: 4.5 },
];

const feedbackTable = [
  { doctor: "Dr. Mehta", rating: "4.8", comment: "Excellent and patient-friendly" },
  { doctor: "Dr. Verma", rating: "4.5", comment: "Quick diagnosis, helpful" },
  { doctor: "Dr. Sharma", rating: "4.3", comment: "Good but long wait time" },
  { doctor: "Dr. Kapoor", rating: "4.6", comment: "Empathetic and clear communication" },
];

const cancellationReasons = [
  { label: "No-show", value: 12 },
  { label: "Reschedule", value: 9 },
  { label: "Technical Issue", value: 5 },
  { label: "Emergency", value: 3 },
];

const cancellationTable = [
  { reason: "No-show", count: 12 },
  { reason: "Reschedule", count: 9 },
  { reason: "Technical Issue", count: 5 },
  { reason: "Emergency", count: 3 },
];

// Seeding Logic
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("🧼 Clearing existing Doctor collections...");
    await Promise.all([
      KpiDoctors.deleteMany({}),
      DoctorTrendDoctors.deleteMany({}),
      AvgConsultDoctors.deleteMany({}),
      FulfillmentRateDoctors.deleteMany({}),
      FeedbackAverageDoctors.deleteMany({}),
      FeedbackTableDoctors.deleteMany({}),
      CancellationReasonsDoctors.deleteMany({}),
      CancellationTableDoctors.deleteMany({}),
    ]);

    console.log("📦 Inserting new Doctor dashboard data...");
    await Promise.all([
      KpiDoctors.insertMany(kpi),
      DoctorTrendDoctors.insertMany(doctorTrend),
      AvgConsultDoctors.insertMany(avgConsultCard),
      FulfillmentRateDoctors.insertMany(fulfillmentRate),
      FeedbackAverageDoctors.insertMany(feedbackAverageData),
      FeedbackTableDoctors.insertMany(feedbackTable),
      CancellationReasonsDoctors.insertMany(cancellationReasons),
      CancellationTableDoctors.insertMany(cancellationTable),
    ]);

    console.log("✅ Doctor dashboard data seeded successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
  });
