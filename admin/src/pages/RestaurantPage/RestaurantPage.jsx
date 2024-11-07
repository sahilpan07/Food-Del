// RestaurantPage.jsx

import React from "react";
import { Link, Outlet } from "react-router-dom";

const RestaurantPage = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-semibold mb-6">Restaurant Management</h1>
      <div className="flex justify-center space-x-4">
        <Link to="/addrestaurant" className="text-blue-500 hover:underline">
          Add Restaurant
        </Link>
        <Link to="/listrestaurant" className="text-blue-500 hover:underline">
          List Restaurants
        </Link>
      </div>
      <Outlet /> {/* Renders nested routes here */}
    </div>
  );
};

export default RestaurantPage;
