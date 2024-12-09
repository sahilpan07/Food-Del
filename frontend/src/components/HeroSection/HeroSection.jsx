import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";

const HeroSection = () => {
  const images = [
    assets.home1,
    assets.home2,
    assets.home3,
    assets.home4,
    assets.home5,
    assets.home6,
    assets.home7,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative bg-gray-50 min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-screen overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-md shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center text-center text-white bg-gradient-to-t from-black to-transparent h-screen">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
            Premium <span className="text-orange-500">Quality</span> Food for
            Your
            <br />
            <span className="text-orange-500">Healthy</span> & Daily Life
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Order delicious, fresh, and nutritious meals delivered straight to
            your doorsteps!
          </p>

          <div className="mt-6 flex items-center justify-center md:justify-start">
            <input
              type="text"
              placeholder="Enter your delivery location"
              className="p-3 rounded-l-md border border-gray-300 w-full md:w-96"
            />
            <button className="p-3 ml-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
