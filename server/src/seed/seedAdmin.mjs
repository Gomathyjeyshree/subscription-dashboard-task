import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.model.mjs";

dotenv.config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await User.findOne({ email: "admin@example.com" });
  if (exists) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashed,
    role: "admin",
  });

  console.log("✅ Admin user created");
  process.exit();
};

seedAdmin();
