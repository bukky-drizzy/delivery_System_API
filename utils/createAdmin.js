const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: process.env.ADMIN_PASS,
      role: "admin",
    });

    console.log("Admin created:", admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();