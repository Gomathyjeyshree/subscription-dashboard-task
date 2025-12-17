import { useEffect, useState } from "react";
import api from "../services/api";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [currentSub, setCurrentSub] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const plansRes = await api.get("/plans");
        setPlans(plansRes.data);

        try {
          const subRes = await api.get("/my-subscription");
          setCurrentSub(subRes.data);
        } catch {
          setCurrentSub(null); // no subscription yet
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const subscribe = async (plan) => {
    if (currentSub?.plan_id?._id === plan._id) return;

    const isUpgrade = !!currentSub;

    if (isUpgrade) {
      const ok = window.confirm(
        `You already have "${currentSub.plan_id.name}".\n\nSwitch to "${plan.name}"?`
      );
      if (!ok) return;
    }

    setLoadingId(plan._id);

    try {
      await api.post(`/subscribe/${plan._id}`);
      const updated = await api.get("/my-subscription");
      setCurrentSub(updated.data);
      alert("Plan updated successfully 🎉");
    } catch (err) {
      alert(err?.response?.data?.message || "Subscription failed");
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading plans...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          Choose your plan
        </h1>
        <p className="mt-2 text-gray-500">
          Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Plans */}
      <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => {
          const isSubscribed =
            currentSub?.plan_id?._id === plan._id;

          return (
            <div
              key={plan._id}
              className={`relative rounded-2xl border bg-white p-8 shadow-sm transition
                ${
                  index === 1
                    ? "border-black scale-105"
                    : "border-gray-200"
                }`}
            >
              {index === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black px-3 py-1 text-xs text-white">
                  Most Popular
                </span>
              )}

              <h2 className="text-xl font-semibold text-gray-900">
                {plan.name}
              </h2>

              <p className="mt-4 text-4xl font-bold text-gray-900">
                ₹{plan.price}
                <span className="ml-1 text-base text-gray-500">
                  /month
                </span>
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-600">✔</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => subscribe(plan)}
                disabled={isSubscribed || loadingId === plan._id}
                className={`mt-8 w-full rounded-lg py-2.5 text-sm font-medium transition
                  ${
                    isSubscribed
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
              >
                {isSubscribed
                  ? "Subscribed ✔"
                  : loadingId === plan._id
                  ? "Processing..."
                  : currentSub
                  ? "Change plan"
                  : "Get started"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
