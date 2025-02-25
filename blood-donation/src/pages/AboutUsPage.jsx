import React from "react";
import { FaHeartbeat, FaHandsHelping, FaUsers } from "react-icons/fa";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";
import founderImage from '../images/founder.jpg'

function AboutUsPage() {
  return (
    <div>
      <NavbarSection />
      <div className="bg-gray-100 py-10 px-5 md:px-20">
        {/* About Us Heading */}
        <h2 className="text-center text-4xl font-bold text-red-600 mb-6">
          About Us
        </h2>

        {/* Founder Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center mb-10">
          <img
            src={founderImage}
            alt="Founder"
            className="w-32 h-32 rounded-full shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Founder Name</h3>
            <p className="text-gray-600">
              Our founder, <span className="font-semibold">John Doe</span>, started this initiative to create an easy and accessible platform for blood donation, ensuring that every life in need gets timely help.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaHeartbeat className="text-red-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
              <p className="text-gray-600">
                To bridge the gap between blood donors and recipients through an efficient, transparent, and user-friendly platform.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaHandsHelping className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
              <p className="text-gray-600">
                To build a world where no life is lost due to a lack of blood availability.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaUsers className="text-green-600 text-4xl mx-auto mb-3" />
              <h4 className="text-xl font-semibold">Large Network</h4>
              <p className="text-gray-600">Thousands of donors registered to help in times of emergency.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaHeartbeat className="text-red-600 text-4xl mx-auto mb-3" />
              <h4 className="text-xl font-semibold">Quick Response</h4>
              <p className="text-gray-600">Find and connect with donors in just a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaHandsHelping className="text-blue-600 text-4xl mx-auto mb-3" />
              <h4 className="text-xl font-semibold">Trust & Transparency</h4>
              <p className="text-gray-600">A secure and verified system to ensure reliable donations.</p>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

export default AboutUsPage;