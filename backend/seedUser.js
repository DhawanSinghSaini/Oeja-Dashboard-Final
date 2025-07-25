const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const userData = {
  employeeId: "ADM001",
  name: "Dhawan Singh",
  email: "admin@gmail.com",
  department: "Admin",
  password: "$2a$12$a7KzTG0ceTjXU8q8t9EQVOwnUFI3nOv/BsRYwFP1Ikz0.9GD1z0zy",
  type: "primary"
};

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("🧼 Clearing existing users...");
    await User.deleteMany({});

    console.log("📦 Seeding single admin user...");
    await User.create(userData);

    console.log("✅ Admin user seeded successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
  });
