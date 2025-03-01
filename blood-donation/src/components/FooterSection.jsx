import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function FooterSection() {
  return (
    <div className="bg-gray-900 text-white pt-10 pb-5">
      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-semibold text-red-500 mb-3">रक्तदान महादान</h3>
          <p className="text-gray-400">
            Join our mission to save lives through blood donation. Your small effort can make a big difference!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-red-500 mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            {["Find Donor", "Donate Blood", "Blood Bank", "About Us", "Contact"].map((item, index) => (
              <li
                key={index}
                className="cursor-pointer transition-all duration-300 hover:text-red-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-red-500 mb-3">Connect with Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
        &copy; 2025 All rights reserved | <span className="text-red-500">Blood Donation Initiative</span>
      </div>
    </div>
  );
}

export default FooterSection;