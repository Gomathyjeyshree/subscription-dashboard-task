import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.mjs";



connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

import authRoutes from "./routes/auth.routes.mjs";
import planRoutes from "./routes/plan.routes.mjs";
import subscriptionRoutes from "./routes/subscription.routes.mjs";
// import paymentRoutes from "./routes/payment.routes.mjs";


// app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api", subscriptionRoutes);

app.listen(5000, () => console.log("Server running on 5000"));


console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);
