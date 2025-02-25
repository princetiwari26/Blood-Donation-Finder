import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, redirecting to login.");
          navigate("/login"); // Redirect to login if token is missing
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) return <p className="text-center text-gray-700">Loading...</p>;

  return (
    <div>
      <div>
        <NavbarSection />
      </div>
      <div>
        <div className="my-10 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
          <h1 className="text-2xl font-bold text-center">
            Welcome, {user.name}!
          </h1>
          <div className="mt-4 space-y-2">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Blood Type:</strong> {user.bloodType}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
          </div>
          <button
            className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600 transition duration-300"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div>
        <FooterSection />
      </div>
    </div>
  );
}

export default ProfilePage;