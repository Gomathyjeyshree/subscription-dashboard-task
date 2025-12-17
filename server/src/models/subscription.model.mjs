
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  start_date: Date,
  end_date: Date,
  status: { type: String, enum: ["active", "expired"], default: "active" }
});

export default mongoose.model("Subscription", subscriptionSchema);
