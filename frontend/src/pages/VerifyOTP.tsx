import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move next
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    // ✅ NEW: HANDLE CHANGE EMAIL
    const handleChangeEmail = () => {
        // keep registerData (already saved)
        navigate("/register");
    };

    const handleVerify = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            return toast.error("Enter complete OTP");
        }

        try {
            await API.post("/auth/verify-otp", {
                email,
                otp: finalOtp,
            });

            toast.success("Account verified ✅");

            // cleanup
            localStorage.removeItem("email");
            localStorage.removeItem("registerData"); // optional reset

            navigate("/login");

        } catch {
            toast.error("Invalid OTP");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">

            <h2 className="text-sm text-gray-500 mb-4">
                Verify your identity
            </h2>

            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm text-center">

                <p className="text-gray-600 mb-6">
                    OTP sent to <b>{email}</b>
                </p>

                {/* OTP INPUTS */}
                <div className="flex justify-center gap-3 mb-6">

                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => {
                                inputsRef.current[i] = el;
                            }}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className="w-12 h-12 text-center text-lg border-b-2 border-gray-400 focus:border-black outline-none"
                        />
                    ))}

                </div>

                <button
                    onClick={handleVerify}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                    Enter the Experience
                </button>

                {/* ✅ FIXED BUTTON */}
                <p
                    onClick={handleChangeEmail}
                    className="text-sm text-gray-400 mt-4 cursor-pointer hover:text-black"
                >
                    ← Change Email
                </p>

            </div>

        </div>
    );
};

export default VerifyOTP;