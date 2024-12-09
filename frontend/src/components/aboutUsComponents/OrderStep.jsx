import React from "react";
import { useNavigate } from "react-router-dom";

const OrderStep = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-12 md:mx-20 p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        How to Order Food with Us
      </h2>
      <p className="text-gray-600 text-lg text-center mb-8">
        Ordering food with us is quick and easy! Just follow these simple steps:
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Step 1: Choose a Restaurant
        </h3>
        <p className="text-gray-600 mb-4">
          Browse through hundreds of popular restaurants available on our
          platform. Find the one that suits your taste and preferences.
        </p>
        <button
          onClick={() => {
            navigate("/explore-res");
          }}
          className="bg-[#040A27] text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Browse Restaurants
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Step 2: Select Your Food
        </h3>
        <p className="text-gray-600 mb-4">
          Once you've chosen a restaurant, pick your favorite dishes from their
          menu. The prices on our website are the same as the restaurant’s.
        </p>
        <button
          onClick={() => {
            navigate("/menu");
          }}
          className="bg-[#040A27] text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          View Menu
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Step 3: Enter Delivery Details
        </h3>
        <p className="text-gray-600 mb-4">
          Fill in your address, select a delivery date and time, and confirm
          your order. We’ll deliver your food directly to your doorstep, and you
          can pay in cash upon delivery.
        </p>
        <button
          onClick={() => {
            navigate("/cart");
          }}
          className="bg-[#040A27] text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm Delivery
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <p className="text-gray-600 text-lg mb-4">
          Alternatively, you can also place your orders by calling us at:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>+01 4237462</li>
          <li>9812345678</li>
        </ul>
        <p className="text-gray-600">
          We are available during our delivery hours.
        </p>
      </div>
    </div>
  );
};

export default OrderStep;
