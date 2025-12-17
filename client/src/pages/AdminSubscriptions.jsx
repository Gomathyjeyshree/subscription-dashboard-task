import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/admin/subscriptions").then((res) => setSubs(res.data));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Subscriptions
        </h1>
        <p className="text-gray-500 mt-1">
          Manage all active and expired subscriptions
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expiry</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {subs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400">
                    No subscriptions found
                  </td>
                </tr>
              )}

              {subs.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">
                      {s.user_id?.email}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {s.plan_id?.name}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          s.status === "active"
                            ? "bg-green-100 text-green-700"
                            : s.status === "expired"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(s.end_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
