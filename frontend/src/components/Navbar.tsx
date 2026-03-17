// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // ✅ better UX
  };

  const isActive = (path: string) =>
  location.pathname === path
    ? "bg-blue-700 text-white px-4 py-2 rounded-lg"
    : "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition";

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">

      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          Works Mentor
        </Link>

        {/* RIGHT */}
        <div className="flex gap-5 text-base items-center">

          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={isActive("/dashboard") }>
              
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition "
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;