import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      setBtnLoading(true);

      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🎉");

      navigate("/dashboard"); // ✅ better flow

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center px-4 py-10">
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">

          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
            Login
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={btnLoading}
            className={`w-full py-3 rounded-lg text-white transition ${
              btnLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {btnLoading ? "Logging in..." : "Login"}
          </button>

          {/* LINK */}
          <p className="text-sm text-center mt-4 text-gray-600">
            New user?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;