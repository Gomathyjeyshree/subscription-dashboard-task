import express from "express";
import razorpay from "../utils/razorpay.mjs";
import authMiddleware from "../middleware/auth.middleware.mjs";

const router = express.Router();

/**
 * CREATE ORDER
 */
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // INR → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Payment order failed" });
  }
});

export default router;
