// RestaurantPage.jsx

import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaPlusCircle, FaListUl } from "react-icons/fa"; // Icons for Add and List actions

const RestaurantPage = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="container p-4 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Restaurant Management
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Manage your restaurant detail with ease. Add, view, and organize your Restaurants here.
        </p>

      <div className="flex justify-center gap-6 mb-8">
          <Link
            to="addrestaurant" // Use relative path for nested routes
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlusCircle size={20} />
            Add Restaurant
          </Link>
          <Link
            to="listrestaurant" // Use relative path for nested routes
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
          >
            <FaListUl size={20} />
            List Category
          </Link>
        </div>
        {/* This is where nested routes will be rendered */}
        <Outlet />
      </div>
    </div>
  );
};

export default RestaurantPage;
