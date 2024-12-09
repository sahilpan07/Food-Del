import React from "react";
import { Link, Outlet } from "react-router-dom";

const OrderPage = ({ url }) => {
  return (
    <div className="w-full bg-gray-50 min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Order Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Track and manage the progress of your orders across various stages.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-8">
        <Link to="onProcess" className="w-full md:w-auto">
          <button className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105">
            On Process
          </button>
        </Link>
        <Link to="foodProcessing" className="w-full md:w-auto">
          <button className="w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105">
            Food Processing
          </button>
        </Link>
        <Link to="outForDelivery" className="w-full md:w-auto">
          <button className="w-full md:w-auto px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105">
            Out for Delivery
          </button>
        </Link>
        <Link to="delivered" className="w-full md:w-auto">
          <button className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105">
            Delivered
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default OrderPage;
