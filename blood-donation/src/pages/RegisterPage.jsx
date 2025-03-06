import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
    age: "",
    phone: "",
    pincode: "",
    country: "India",
    state: "",
    city: "",
    available: true,
  });

  const [ageError, setAgeError] = useState("");
  const [apiError, setApiError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const statesAndCities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Hubli"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "age") {
      const age = parseInt(value, 10);
      setAgeError(
        age < 18 || age > 60
          ? "Only individuals between 18 and 60 years can donate blood."
          : ""
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (ageError) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );
      if (response.data.success) {
        setShowPopup(true);
        setApiError("");
        setFormData({
          name: "",
          email: "",
          password: "",
          bloodType: "",
          age: "",
          phone: "",
          pincode: "",
          country: "India",
          state: "",
          city: "",
          available: true
        });
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavbarSection />

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl md:flex md:flex-wrap sm:grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
              Register to Donate Blood
            </h2>
            {apiError && <p className="text-red-500 text-center">{apiError}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
              {["name", "email", "password", "age", "phone", "pincode"].map(
                (field) => (
                  <div key={field} className="flex items-center space-x-2">
                    <label className="w-1/3 text-gray-700 font-medium capitalize">
                      {field}:
                    </label>
                    <input
                      type={
                        field === "password"
                          ? "password"
                          : field === "age"
                            ? "number"
                            : "text"
                      }
                      name={field}
                      placeholder={field}
                      className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )
              )}
              {ageError && <p className="text-red-500 text-sm">{ageError}</p>}
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-700 font-medium">
                  Blood Type:
                </label>
                <select
                  name="bloodType"
                  className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-700 font-medium">
                  State:
                </label>
                <select
                  name="state"
                  className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(statesAndCities).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-700 font-medium">City:</label>
                <select
                  name="city"
                  className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {(statesAndCities[formData.state] || []).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700"
              >
                Register
              </button>
            </form>
            <div className="text-center my-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-red-600 hover:underline">Login</Link>
            </div>
          </div>


          <div className="bg-red-50 p-6 rounded-md shadow-md flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-red-600 text-center mb-4">
              Why Donate Blood?
            </h3>
            <p className="text-gray-700 text-sm">
              - Saves lives in emergencies and medical conditions.
              <br />
              - Helps patients suffering from anemia, cancer, and surgeries.
              <br />- Regular donors have a healthier cardiovascular system.
            </p>
          </div>


        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">Registration Successful!</p>
            <div className="mt-4 space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}

export default RegisterPage;