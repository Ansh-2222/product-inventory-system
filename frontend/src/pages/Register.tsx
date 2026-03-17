import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ LOAD PREVIOUS DATA
  useEffect(() => {
    const saved = localStorage.getItem("registerData");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  const handleRegister = async () => {
    try {
      // ✅ SAVE FULL FORM
      localStorage.setItem("registerData", JSON.stringify(form));
      localStorage.setItem("email", form.email);

      await API.post("/auth/register", form);

      toast.success("OTP sent to email 📩");

      navigate("/verify-otp");

    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center px-4 py-10">
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Create Account
          </h2>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border-b p-3 mb-4 outline-none focus:outline-none focus:ring-0 caret-black"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border-b p-3 mb-4 outline-none focus:outline-none focus:ring-0 caret-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border-b p-3 mb-4 outline-none focus:outline-none focus:ring-0 caret-black"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Create Account
          </button>

          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;