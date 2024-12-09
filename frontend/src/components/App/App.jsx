import React from "react";
import { assets } from "../../assets/assets";

const App = () => {
  return (
    <div className="text-center mt-24 mx-auto px-4 md:px-8 lg:px-16">
      <p className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
        Experience the Joy of Food <br /> Download the{" "}
        <span className="text-orange-600">Foodie App</span>
      </p>

      <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-6 mb-12">
        Discover delicious meals from top restaurants near you, track your
        orders seamlessly, and enjoy a personalized food ordering experience.
      </p>

      <div className="flex justify-center gap-6 mt-6">
        <img
          src={assets.play_store}
          alt="Download on Google Play"
          className="w-36 md:w-40 transition-transform duration-500 cursor-pointer hover:scale-110"
        />
        <img
          src={assets.app_store}
          alt="Download on the App Store"
          className="w-36 md:w-40 transition-transform duration-500 cursor-pointer hover:scale-110"
        />
      </div>
    </div>
  );
};

export default App;
