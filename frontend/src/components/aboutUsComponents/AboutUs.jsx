import React from "react";
import { Icon } from '@iconify/react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-8 sm:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          About Us
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-16 px-4 sm:px-16">
          Welcome to <span className="text-orange-500">Foodie</span>, where convenience meets flavor. We deliver the best Nepalese and international dishes right to your doorstep.
        </p>

        {/* Mission & Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

          {/* Mission Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              At Foodie, we are committed to bringing you the best food experiences. We partner with top local chefs and restaurants to deliver fresh, delicious meals directly to your door.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Whether you’re craving traditional Nepalese dishes or international favorites, we make food delivery easy and enjoyable for everyone. Support local businesses while enjoying great food!
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <div className="space-y-6">
              <div className="flex items-center text-gray-600">
                <Icon icon="mdi:food" className="h-6 w-6 text-blue-500 mr-4" />
                <span>Supporting Local Businesses</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Icon icon="mdi:food-fork-drink" className="h-6 w-6 text-blue-500 mr-4" />
                <span>Celebrating Nepalese Culinary Heritage</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Icon icon="mdi:pine-tree" className="h-6 w-6 text-blue-500 mr-4" />
                <span>Delivering Fresh, High-Quality Meals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 mb-6">
            Ready to experience the best food Nepal has to offer? Join us today and support local chefs.
          </p>
          <button className="bg-[#040A27] text-white py-3 px-8 rounded-lg text-lg font-semibold transform transition-all duration-300 hover:bg-blue-700 hover:scale-105">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
