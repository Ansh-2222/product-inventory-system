// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-black-600">
          Works Mentor
        </Link>

        {/* RIGHT */}
        <div className="flex gap-5 text-base items-center">

          {!loggedIn ? (
            <>
              <Link to="/login" className="hover:text-black-600">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`font-medium ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
                    : "bg-blue-600 text-white px-4 py-2 rounded-lg"
                }`}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500"
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