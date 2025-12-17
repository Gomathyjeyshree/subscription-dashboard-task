import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/my-subscription")
      .then((res) => setSub(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Page title */}
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">
        Dashboard
      </h1>

      {/* USER INFO CARD */}
      <div className="mb-8 max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          User Details
        </h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium text-gray-900">Name:</span>{" "}
            {user?.name}
          </p>

          <p>
            <span className="font-medium text-gray-900">Email:</span>{" "}
            {user?.email}
          </p>

          <p>
            <span className="font-medium text-gray-900">Role:</span>{" "}
            <span className="capitalize">{user?.role}</span>
          </p>
        </div>
      </div>

      {/* SUBSCRIPTION CARD */}
      {!sub ? (
        <div className="max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No active subscription
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Choose a plan to get started.
          </p>
        </div>
      ) : (
        <div className="max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              My Subscription
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                sub.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {sub.status}
            </span>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Plan:</span>{" "}
              {sub.plan_id.name}
            </p>

            <p>
              <span className="font-medium text-gray-900">Expires on:</span>{" "}
              {new Date(sub.end_date).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
