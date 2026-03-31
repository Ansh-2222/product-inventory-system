import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [btnLoading, setBtnLoading] = useState(false);

  
  useEffect(() => {
    if (location.state?.form) {
      setForm(location.state.form);
    }
  }, [location.state]);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      setBtnLoading(true);

      await API.post("/auth/register", form);

      toast.success("OTP sent to email successfully ");

      navigate("/verify-otp", { state: { form } });

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
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
            Create Account
          </h2>

          {/* NAME */}
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border-b p-3 mb-4 outline-none"
          />

          {/* EMAIL */}
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border-b p-3 mb-4 outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border-b p-3 mb-4 outline-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={btnLoading}
            className={`w-full py-3 rounded-lg text-white flex justify-center items-center gap-2 transition ${
              btnLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {btnLoading ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* LOGIN LINK */}
          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;