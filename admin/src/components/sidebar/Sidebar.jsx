import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white shadow-lg border border-gray-300">
      {/* Hamburger Menu for Small Screens */}
      <div className="lg:hidden p-4 flex   justify-between items-center">
        <button onClick={toggleSidebar} className="text-2xl">
          <Icon icon="mdi:hamburger-menu" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block pt-8 pl-6 flex flex-col gap-8`}
      >
        <h2 className="text-md lg:text-xl font-semibold text-[#040A27] mb-6">
          Admin Menu
        </h2>

        {/* Restaurant Link */}
        <NavLink
          onClick={handleScrollToTop}
          to="/restaurant"
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600 transform scale-105"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent"
            }`
          }
        >
          <Icon
            icon="ic:baseline-restaurant"
            className="w-6 h-6 text-[#040A27] transition-all duration-300"
          />
          <p className="font-semibold text-lg hidden lg:block">Restaurant</p>
        </NavLink>

        {/* Category Link */}
        <NavLink
          onClick={handleScrollToTop}
          to="/category"
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600 transform scale-105"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent"
            }`
          }
        >
          <Icon
            icon="material-symbols:category"
            className="w-6 h-6 text-[#040A27] transition-all duration-300"
          />
          <p className="font-semibold text-lg hidden lg:block">Category</p>
        </NavLink>

        {/* Item Link */}
        <NavLink
          onClick={handleScrollToTop}
          to="/item"
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600 transform scale-105"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent"
            }`
          }
        >
          <Icon
            icon="material-symbols:fastfood"
            className="w-6 h-6 text-[#040A27] transition-all duration-300"
          />
          <p className="font-semibold text-lg hidden lg:block">Item</p>
        </NavLink>

        {/* Orders Link */}
        <NavLink
          onClick={handleScrollToTop}
          to="/orderPage"
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600 transform scale-105"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent"
            }`
          }
        >
          <Icon
            icon="material-symbols:receipt-long"
            className="w-6 h-6 text-[#040A27] transition-all duration-300"
          />
          <p className="font-semibold text-lg hidden lg:block">Orders</p>
        </NavLink>

        {/* Sidebar Footer (optional) */}
        <div className="mt-auto pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">Powered by FOODIE</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
