import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to <span className="text-gray-900">SaaS Platform</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Manage subscriptions, plans, and users with a clean and
          powerful SaaS dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-900"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Subscription Management
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Easily manage user subscriptions and plans.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Secure Authentication
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Login and registration with secure APIs.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Modern Dashboard
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Clean, modern UI built with React & Tailwind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
