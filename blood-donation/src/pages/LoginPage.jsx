import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); 
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavbarSection />

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl md:fles md:flex-wrap sm:grid grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-md shadow-md flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-blue-600 text-center mb-4">
              Welcome Back!
            </h3>
            <p className="text-gray-700 text-sm">
              - Secure access to your donor profile. <br />
              - Track your donations and eligibility. <br />
              - Connect with those in need. <br />
              - Be a part of a life-saving community.
            </p>
            <div className="text-center mt-4">
              <img
                src="/images/login-image.png"
                alt="Login Illustration"
                className="w-32 mx-auto"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="p-6 rounded-lg bg-white shadow-lg w-96 mt-5">
              <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Login
              </h2>
              {error && <p className="text-red-500 text-center">{error}</p>}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Password:
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-4">
                <Link to="/forgot-password" className="text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <div className="text-center mt-2">
                <span>Don't have an account? </span>
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default LoginPage;