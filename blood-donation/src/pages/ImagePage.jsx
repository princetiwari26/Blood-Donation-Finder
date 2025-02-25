import React, { useState } from "react";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";

const imageUrls = [
  "https://source.unsplash.com/random/800x600?blood-donation",
  "https://source.unsplash.com/random/800x600?hospital",
  "https://source.unsplash.com/random/800x600?healthcare",
  "https://source.unsplash.com/random/800x600?doctor",
  "https://source.unsplash.com/random/800x600?medicine",
  "https://source.unsplash.com/random/800x600?emergency",
];

function ImagesPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <NavbarSection />
      <div className="bg-gray-100 py-10">
        <h2 className="text-center text-3xl font-bold text-red-600 mb-6">
          Blood Donation Moments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => setSelectedImage(url)}
            >
              <img src={url} alt={`Blood Donation ${index + 1}`} className="w-full h-60 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}

export default ImagesPage;