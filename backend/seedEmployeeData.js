const mongoose = require("mongoose");
require("dotenv").config();

const Employee = require("./models/Employee");

const employeeData = [
  {
    employeeId: "FIN123",
    name: "Alice Sharma",
    email: "emp1@gmail.com",
    department: "Finance",
    phone: "9876543210",
    password: "$2a$12$1bu3d8mT75jv9F/PnM3vDeu399N748pZdlqpgzv0yOK1.1p1zOiMq",
  },
  {
    employeeId: "ENG123",
    name: "Ravi Mehta",
    email: "emp2@gmail.com",
    department: "Engagement",
    phone: "9876543211",
    password: "$2a$12$BdTZaG/LYxj6iHn43VK/m.Wl7KUgCG7nkMQvzuNrAjbuabIhMKAT6",
  },
  {
    employeeId: "DOC123",
    name: "Priya Desai",
    email: "emp3@gmail.com",
    department: "Doctors",
    phone: "9876543212",
    password: "$2a$12$SSxc1SotfS7.WnuTZZszAuSvVqCV29mnzXPODkcUgbOh8l/tTMvaC",
  },
  {
    employeeId: "FIN124",
    name: "Arjun Rao",
    email: "emp4@gmail.com",
    department: "Finance",
    phone: "9876543213",
    password: "$2a$12$rHDtuImVWsto1zslkvu2Tus72tWOu.c2WMag.GY5849aB8XidI3M2",
  },
  {
    employeeId: "ENG124",
    name: "Sneha Gupta",
    email: "emp5@gmail.com",
    department: "Engagement",
    phone: "9876543214",
    password: "$2a$12$EvvOMxwN56G7VYZeeF7tZ.a5w5BHvEt9ahZiROKRFyi2Tu6Uqvdru",
  },
  {
    employeeId: "DOC124",
    name: "Karan Singh",
    email: "emp6@gmail.com",
    department: "Doctors",
    phone: "9876543215",
    password: "$2a$12$.EoOY18OPhYEYoGmgSjd6.fLcpmNraAAXMsDn7CXvKlnlaJVZPp/6",
  },
  {
    employeeId: "OPS123",
    name: "Divya Nair",
    email: "emp7@gmail.com",
    department: "Operations",
    phone: "9876543216",
    password: "$2a$12$NKKslSp2vSZe17heiyQBnOMDo6TuMrXFi0P.pxIO1vYQzOjobLsJO",
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("🧼 Clearing existing employees...");
    await Employee.deleteMany({});

    console.log("📦 Seeding new employee records...");
    await Employee.insertMany(employeeData);

    console.log("✅ Employee data seeded successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
  });
