import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const HomePage = ({ url }) => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [categoryCount, setCategorycount] = useState(0);
  const [orderCount, setOrdercount] = useState(0);

  useEffect(() => {
    const fetchRestaurantCount = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants`);
        if (response.data.success) {
          setRestaurantCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching restaurant count:", error);
      }
    };
    const fetchFoodCount = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
          setFoodCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching restaurant count:", error);
      }
    };
    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get(`${url}/api/categories`);
        if (response.data.success) {
          setCategorycount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching restaurant count:", error);
      }
    };
    const fetchOrderCount = async () => {
      try {
        const response = await axios.get(`${url}/api/order/list`);
        if (response.data.success) {
          setOrdercount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching Order count:", error);
      }
    };

    fetchCategoryCount();
    fetchFoodCount();
    fetchRestaurantCount();
    fetchOrderCount();
  }, [url]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#040A27]">
          Welcome to the Admin Panel
        </h1>
        <p className="mt-2 text-gray-600">
          Manage restaurants, categories, items, and orders efficiently.
        </p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Card Example */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <Icon
            icon="ic:baseline-restaurant"
            className="text-4xl text-[#040A27]"
          />
          <div className="ml-4">
            <p className="text-2xl font-bold">{restaurantCount}</p>
            <p className="text-gray-600">Restaurants</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <Icon
            icon="ic:baseline-category"
            className="text-4xl text-[#040A27]"
          />
          <div className="ml-4">
            <p className="text-2xl font-bold">{categoryCount}</p>
            <p className="text-gray-600">Categories</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <Icon icon="ic:round-fastfood" className="text-4xl text-[#040A27]" />
          <div className="ml-4">
            <p className="text-2xl font-bold">{foodCount}</p>
            <p className="text-gray-600">Items</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <Icon
            icon="ic:baseline-shopping-cart"
            className="text-4xl text-[#040A27]"
          />
          <div className="ml-4">
            <p className="text-2xl font-bold">{orderCount}</p>
            <p className="text-gray-600">Orders</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-[#040A27] mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between text-gray-700">
            <p>
              New restaurant{" "}
              <span className="font-semibold">"James Holland"</span> added.
            </p>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between text-gray-700">
            <p>
              Category <span className="font-semibold">"Desserts"</span>{" "}
              updated.
            </p>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex items-center justify-between text-gray-700">
            <p>Order #1234 marked as delivered.</p>
            <span className="text-sm text-gray-500">Yesterday</span>
          </li>
        </ul>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          onClick={handleScrollToTop}
          to="/restaurant/addrestaurant"
          className="bg-[#040A27] text-white rounded-lg shadow-md p-6 flex flex-col items-center hover:bg-violet-800 transition-all"
        >
          <Icon icon="ic:baseline-add-business" className="text-4xl mb-2" />
          <p className="text-lg font-semibold">Add New Restaurant</p>
        </Link>
        <Link
          onClick={handleScrollToTop}
          to="/category/addCategory"
          className="bg-[#040A27] text-white rounded-lg shadow-md p-6 flex flex-col items-center hover:bg-violet-800 transition-all"
        >
          <Icon icon="ic:baseline-category" className="text-4xl mb-2" />
          <p className="text-lg font-semibold">Add New Category</p>
        </Link>
        <Link
          onClick={handleScrollToTop}
          to="/item/addItem"
          className="bg-[#040A27] text-white rounded-lg shadow-md p-6 flex flex-col items-center hover:bg-violet-800 transition-all"
        >
          <Icon icon="ic:round-fastfood" className="text-4xl mb-2" />
          <p className="text-lg font-semibold">Add New Item</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
