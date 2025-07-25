const mongoose = require("mongoose");
const Request = require('./models/Request');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const sampleRequests = [
  {
    id: "REQ001",
    fullName: "Dr. Ananya Rao",
    email: "ananya.rao@apollohospitals.in",
    role: "Physician",
    licenseNumber: "MED87654",
    licenseExpiry: new Date("2027-03-15"),
    organization: "Apollo Hospitals",
    identityScanUrl: "https://drive.google.com/id-ananya",
    licenseScanUrl: "https://drive.google.com/license-ananya",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ002",
    fullName: "Nurse S. Verma",
    email: "s.verma@careplus.in",
    role: "Nurse",
    licenseNumber: "MED45678",
    licenseExpiry: new Date("2026-10-22"),
    organization: "CarePlus Clinic",
    identityScanUrl: "",
    licenseScanUrl: "https://drive.google.com/license-verma",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ003",
    fullName: "Dr. Vikram Iyer",
    email: "vikram.iyer@medtrust.org",
    role: "Surgeon",
    licenseNumber: "SURG12345",
    licenseExpiry: new Date("2028-01-10"),
    organization: "MedTrust",
    identityScanUrl: "https://drive.google.com/id-vikram",
    licenseScanUrl: "https://drive.google.com/license-vikram",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ004",
    fullName: "Dr. Neha Mehta",
    email: "neha.mehta@lifecare.com",
    role: "Pediatrician",
    licenseNumber: "PED67890",
    licenseExpiry: new Date("2025-09-30"),
    organization: "LifeCare Hospital",
    identityScanUrl: "https://drive.google.com/id-neha",
    licenseScanUrl: "",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ005",
    fullName: "Ravi Kumar",
    email: "ravi.kumar@clinicone.net",
    role: "Lab Technician",
    licenseNumber: "LAB54321",
    licenseExpiry: new Date("2026-04-18"),
    organization: "Clinic One",
    identityScanUrl: "",
    licenseScanUrl: "",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ006",
    fullName: "Dr. Aarti Joshi",
    email: "aarti.joshi@neohealth.in",
    role: "Cardiologist",
    licenseNumber: "CARD99887",
    licenseExpiry: new Date("2029-07-25"),
    organization: "NeoHealth",
    identityScanUrl: "https://drive.google.com/id-aarti",
    licenseScanUrl: "https://drive.google.com/license-aarti",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ007",
    fullName: "Sunita Sharma",
    email: "sunita.sharma@care4all.org",
    role: "Nurse",
    licenseNumber: "NUR65432",
    licenseExpiry: new Date("2025-12-05"),
    organization: "Care4All",
    identityScanUrl: "",
    licenseScanUrl: "https://drive.google.com/license-sunita",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ008",
    fullName: "Dr. Kabir Nair",
    email: "kabir.nair@healthwise.com",
    role: "Dermatologist",
    licenseNumber: "DERM11223",
    licenseExpiry: new Date("2026-03-14"),
    organization: "Healthwise Clinic",
    identityScanUrl: "https://drive.google.com/id-kabir",
    licenseScanUrl: "https://drive.google.com/license-kabir",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ009",
    fullName: "Preeti Desai",
    email: "preeti.desai@mobilecare.in",
    role: "Field Nurse",
    licenseNumber: "FNUR78901",
    licenseExpiry: new Date("2027-11-20"),
    organization: "MobileCare",
    identityScanUrl: "",
    licenseScanUrl: "",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ010",
    fullName: "Dr. Rajesh Patil",
    email: "rajesh.patil@primehospital.com",
    role: "Orthopedic",
    licenseNumber: "ORTH12321",
    licenseExpiry: new Date("2028-08-09"),
    organization: "Prime Hospital",
    identityScanUrl: "https://drive.google.com/id-rajesh",
    licenseScanUrl: "",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ011",
    fullName: "Nurse Meera Jain",
    email: "meera.jain@familyhealth.org",
    role: "Nurse",
    licenseNumber: "NUR33456",
    licenseExpiry: new Date("2025-06-30"),
    organization: "Family Health Center",
    identityScanUrl: "https://drive.google.com/id-meera",
    licenseScanUrl: "https://drive.google.com/license-meera",
    status: "pending",
    adminComment: ""
  },
  {
    id: "REQ012",
    fullName: "Dr. Sameer Kulkarni",
    email: "sameer.kulkarni@hopehospital.in",
    role: "Pulmonologist",
    licenseNumber: "PULM76543",
    licenseExpiry: new Date("2026-01-25"),
    organization: "Hope Hospital",
    identityScanUrl: "https://drive.google.com/id-sameer",
    licenseScanUrl: "https://drive.google.com/license-sameer",
    status: "pending",
    adminComment: ""
  },
];

async function seed() {
  await Request.deleteMany({});
  await Request.insertMany(sampleRequests);
  console.log("✅ Seeded 12 requests successfully");
  mongoose.disconnect();
}

seed();
