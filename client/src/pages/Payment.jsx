import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state?.plan;

  if (!plan) {
    navigate("/plans");
    return null;
  }

  const payNow = async () => {
    // 1️⃣ Create order
    const { data } = await api.post("/payment/create-order", {
      amount: plan.price,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "SaaS Admin",
      description: plan.name,
      order_id: data.id,

      handler: async (response) => {
        // 2️⃣ Verify payment
        await api.post("/payment/verify", {
          ...response,
          planId: plan._id,
        });

        alert("Payment successful 🎉");
        navigate("/dashboard");
      },

      theme: { color: "#111827" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          Confirm your plan
        </h2>

        <p className="text-gray-600">
          Plan: <b>{plan.name}</b>
        </p>
        <p className="text-gray-600">
          Price: <b>₹{plan.price}</b>
        </p>

        <button
          onClick={payNow}
          className="mt-6 w-full bg-black text-white py-2 rounded-lg"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
