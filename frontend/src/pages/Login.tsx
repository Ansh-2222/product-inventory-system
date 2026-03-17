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
    try {
      setBtnLoading(true);

      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🎉");

      navigate("/");

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center px-4 py-10">
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Login
          </h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b p-3 mb-4 outline-none focus:outline-none focus:ring-0 caret-black"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b p-3 mb-4 outline-none focus:outline-none focus:ring-0 caret-black"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {btnLoading ? "Loading..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4">
            New user?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;