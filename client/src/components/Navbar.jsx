import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Active + hover underline style (dark navbar)
  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "text-white after:absolute after:-bottom-4 after:left-0 after:h-[2px] after:w-full after:bg-white"
         : "text-gray-300 hover:text-white after:absolute after:-bottom-4 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-200 hover:after:w-full"
     }`;

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-semibold text-white tracking-tight"
        >
          SaaS Admin
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/plans" className={linkClass}>
                Plans
              </NavLink>

              {user.role === "admin" && (
                <NavLink to="/admin/subscriptions" className={linkClass}>
                  Admin
                </NavLink>
              )}

              {/* Divider */}
              <span className="h-4 w-px bg-gray-700 mx-2" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
