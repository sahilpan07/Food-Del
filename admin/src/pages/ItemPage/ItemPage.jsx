import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaPlusCircle, FaListUl } from "react-icons/fa"; // Icons for Add and List actions

const ItemPage = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="container mx-auto p-4 bg-white shadow-xl rounded-lg sm:max-w-md md:max-w-2xl lg:max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Item Management
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Manage your items with ease. Add, view, and organize your items here.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link
            onClick={handleScrollToTop}
            to="addItem" // Use relative path for nested routes
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <FaPlusCircle size={20} />
            <span>Add Item</span>
          </Link>

          <Link
            onClick={handleScrollToTop}
            to="itemList" // Use relative path for nested routes
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white text-lg rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <FaListUl size={20} />
            <span>Item List</span>
          </Link>
        </div>

        {/* This is where nested routes will be rendered */}
        <Outlet />
      </div>
    </div>
  );
};

export default ItemPage;
