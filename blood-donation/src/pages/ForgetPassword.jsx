import React, { useState } from "react";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";

function ForgetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle next step
  const handleNext = () => {
    if (step === 1 && email.includes("@")) setStep(2);
    else if (step === 2 && otp.length === 6) setStep(3);
    else if (step === 3 && password === confirmPassword) alert("Password Changed Successfully!");
  };

  return (
    <div>
      <NavbarSection />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-2xl rounded-3xl w-full md:w-3/4 lg:w-2/3 grid grid-cols-1 md:grid-cols-2">
          {/* Left Side */}
          <div className="p-6 flex flex-col justify-center transition-all duration-500">
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-bold text-red-600 mb-4">Reset Your Password</h2>
                <p className="text-gray-600 mb-4">Enter your email to receive an OTP.</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : step === 2 ? (
              <>
                <h2 className="text-2xl font-bold text-red-600 mb-4">Enter OTP</h2>
                <p className="text-gray-600 mb-4">A 6-digit OTP has been sent to your email.</p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  maxLength={6}
                  className="w-full p-3 border rounded-lg mb-4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-600 mb-4">Set New Password</h2>
                <p className="text-gray-600 mb-4">Choose a strong password for security.</p>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 border rounded-lg mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-lg mb-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            )}
            <button
              onClick={handleNext}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>

          {/* Right Side */}
          <div className="p-6 flex flex-col justify-center bg-red-100 text-red-800 rounded-r-3xl hidden md:flex transition-all duration-500">
            {step === 1 ? (
              <h2 className="text-2xl font-bold mb-4">Why Reset Your Password?</h2>
            ) : step === 2 ? (
              <h2 className="text-2xl font-bold mb-4">Secure Your Account</h2>
            ) : (
              <h2 className="text-2xl font-bold mb-4">Create a Strong Password</h2>
            )}
            <p>
              {step === 1
                ? "Make sure to use a valid email that you have access to."
                : step === 2
                ? "Do not share your OTP with anyone to keep your account secure."
                : "Your password should contain uppercase, lowercase, numbers, and special characters."}
            </p>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default ForgetPasswordPage;