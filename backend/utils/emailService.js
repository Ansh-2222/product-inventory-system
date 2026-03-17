import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: "Works Mentor <noreply@uvingroup.xyz>",
      to: email,
      subject: "Your OTP Code ",
      html: `<h2>Your OTP is: ${otp}</h2>
             <p>This OTP will expire in 5 minutes.</p>`
    });

    console.log("OTP Email sent:", response);
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};