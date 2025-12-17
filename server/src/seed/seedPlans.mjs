import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "../models/plan.model.mjs";

dotenv.config();

const plans = [
  {
    name: "Basic",
    price: 499,
    duration: 30,
    features: [
      "Access to basic features",
      "Email support",
      "Single user",
    ],
  },
  {
    name: "Pro",
    price: 999,
    duration: 30,
    features: [
      "Everything in Basic",
      "Priority email support",
      "Up to 5 users",
      "Advanced analytics",
    ],
  },
  {
    name: "Business",
    price: 1999,
    duration: 30,
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Unlimited users",
      "Team management",
    ],
  },
  {
    name: "Enterprise",
    price: 4999,
    duration: 365,
    features: [
      "All Business features",
      "Dedicated account manager",
      "Custom integrations",
      "SLA support",
    ],
  },
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Plan.deleteMany(); // reset
    await Plan.insertMany(plans);

    console.log("✅ Plans seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedPlans();
