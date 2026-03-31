import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const form = location.state?.form; 
    const email = form?.email;

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [btnLoading, setBtnLoading] = useState(false);

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!form) {
            navigate("/register");
        }
    }, [form]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

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

    const handleChangeEmail = () => {
        navigate("/register", { state: { form } });
    };

    const handleVerify = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            return toast.error("Enter complete OTP");
        }

        try {
            setBtnLoading(true);

            await API.post("/auth/verify-otp", {
                email,
                otp: finalOtp,
            });

            toast.success("Account verified successfully ");

            navigate("/login");

        } catch {
            toast.error("Invalid OTP");
        } finally {
            setBtnLoading(false);
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

                {/* OTP BOXES */}
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

                {/* VERIFY BUTTON */}
                <button
                    onClick={handleVerify}
                    disabled={btnLoading}
                    className={`w-full py-3 rounded-lg text-white flex justify-center items-center gap-2 ${
                        btnLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"
                    }`}
                >
                    {btnLoading ? (
                        <>
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                            Verifying...
                        </>
                    ) : (
                        "Enter the Experience"
                    )}
                </button>

                {/* CHANGE EMAIL */}
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