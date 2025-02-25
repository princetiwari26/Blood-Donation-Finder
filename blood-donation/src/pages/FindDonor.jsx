import React, { useState } from "react";
import axios from "axios";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";
import donorImage from "../images/donor.jpg";

function FindDonor() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [donors, setDonors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const states = ["Delhi", "Maharashtra", "Karnataka"];
  const citiesByState = {
    Delhi: ["New Delhi", "South Delhi"],
    Maharashtra: ["Mumbai", "Pune"],
    Karnataka: ["Bangalore", "Mysore"],
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearched(true);

    try {
      const response = await axios.get("http://localhost:8000/api/user/search", {
        params: { state, city, pincode },
      });
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setDonors([]);
    }
  };

  return (
    <div>
      <NavbarSection />

      <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 py-10 px-5">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-red-600 mb-5 text-center">Find a Blood Donor</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-3 gap-4 items-end">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">State:</label>
              <select className="p-2 border rounded" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                {states.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              {state && (
                <>
                  <label className="font-semibold text-gray-700">City:</label>
                  <select className="p-2 border rounded" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">Select City</option>
                    {citiesByState[state]?.map((ct) => (
                      <option key={ct} value={ct}>{ct}</option>
                    ))}
                  </select>
                </>
              )}
            </div>

            <div className="text-center flex flex-col justify-center items-center text-gray-700 font-semibold text-lg">
              OR
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">Pincode:</label>
              <input
                type="text"
                placeholder="Enter Pincode"
                className="p-2 border rounded"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <button type="submit" className="col-span-3 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
              Search
            </button>
          </form>
        </div>

        {/* Right Side Content */}
        <div className="hidden lg:block lg:ml-10 mt-8 lg:mt-0 text-center lg:text-left">
          <img src={donorImage} alt="Blood Donation" className="rounded-lg shadow-lg w-96" />
          <h3 className="text-xl font-semibold text-red-600 mt-4">Your Contribution Can Save Lives!</h3>
          <p className="text-gray-600 mt-2">
            Join us in helping those in need. Your small act of kindness can make a big difference.
          </p>
        </div>
      </div>

      {/* Search Results Table */}
      {isSearched && (
        <div className="container mx-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Available Donors</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="px-4 py-2">S.No.</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Blood Type</th>
                  <th className="px-4 py-2">State</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">Pincode</th>
                </tr>
              </thead>
              <tbody>
                {donors.length > 0 ? (
                  donors.map((donor, index) => (
                    <tr key={donor._id} className="text-center border-b hover:bg-gray-100 transition-all">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{donor.name}</td>
                      <td className="px-4 py-2">{donor.email}</td>
                      <td className="px-4 py-2">{donor.phone}</td>
                      <td className="px-4 py-2">{donor.bloodType}</td>
                      <td className="px-4 py-2">{donor.state}</td>
                      <td className="px-4 py-2">{donor.city}</td>
                      <td className="px-4 py-2">{donor.pincode}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-gray-500 py-4">No donors found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Content for Mobile (Appears Below Table) */}
      <div className="lg:hidden text-center mt-6">
        <img src={donorImage} alt="Blood Donation" className="rounded-lg shadow-lg w-72 mx-auto" />
        <h3 className="text-xl font-semibold text-red-600 mt-4">Your Contribution Can Save Lives!</h3>
        <p className="text-gray-600 mt-2">
          Join us in helping those in need. Your small act of kindness can make a big difference.
        </p>
      </div>

      <FooterSection />
    </div>
  );
}

export default FindDonor;