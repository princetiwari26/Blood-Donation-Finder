import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaTint, FaHospital, FaHandHoldingHeart, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import logo from "../images/bloodLogo.png";

function NavbarSection() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await axios.get("http://localhost:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleDonateBlood = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-700 shadow-xl text-white py-4 px-6 rounded-b-3xl">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-white p-1 shadow-lg">
            <img src={logo} className="rounded-full w-20 md:w-28" alt="Blood Logo" />
          </div>
          <div className="text-4xl font-bold tracking-wide">
            <div>रक्तदान</div>
            <div>महादान</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-3 md:space-x-6 font-semibold">
          <Link to="/" className="bg-white/20 border border-white px-4 py-2 rounded-lg transition-all duration-300 text-center hover:shadow-lg">
            <FaTint className="text-white mx-auto mb-1 animate-bounce" size={20} />
            Find Donor
          </Link>

          <Link to="/blood-bank" className="bg-white/20 border border-white px-4 py-2 rounded-lg transition-all duration-300 text-center hover:shadow-lg">
            <FaHospital className="text-white mx-auto mb-1" size={20} />
            Blood Bank
          </Link>

          <button onClick={handleDonateBlood} className="bg-white/20 border border-white px-4 py-2 rounded-lg transition-all duration-300 text-center hover:shadow-lg">
            <FaHandHoldingHeart className="text-white mx-auto mb-1 animate-pulse" size={20} />
            Donate Blood
          </button>

          <Link to="/about" className="bg-white/20 border border-white px-4 py-2 rounded-lg transition-all duration-300 text-center hover:shadow-lg">
            <FaInfoCircle className="text-white mx-auto mb-1" size={20} />
            About Us
          </Link>

          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="bg-white/20 border border-white px-4 py-2 rounded-lg transition-all duration-300 text-center hover:shadow-lg"
            >
              <FaUser className="text-white mx-auto mb-1" size={20} />
              {user.name.split(" ")[0]}
            </button>
          ) : (
            <Link to="/login" className="bg-white/20 border border-white px-4 py-2 rounded-lg transition-all duration-300 text-center hover:shadow-lg">
              <FaUser className="text-white mx-auto mb-1" size={20} />
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarSection;