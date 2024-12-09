import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantDetail = ({ url }) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(
          `${url}/api/restaurants/restaurant/${id}`
        );
        if (response.data.success) {
          setRestaurant(response.data.data);
        } else {
          alert("Restaurant not found");
        }
      } catch (error) {
        console.error("Error fetching restaurant details", error);
      }
    };

    fetchRestaurantDetails();
  }, [id, url]);

  if (!restaurant) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 sm:p-8 max-w-3xl">
      <h3 className="text-3xl sm:text-4xl font-semibold text-center mb-8 text-blue-600">
        Restaurant Details
      </h3>

      <div className="bg-white shadow-2xl rounded-lg p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <img
            src={`${url}/images/${restaurant.image}`}
            className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-lg shadow-md mx-auto"
            alt={restaurant.name}
          />
        </div>

        <div className="text-center text-2xl font-bold text-gray-800 mb-4">
          {restaurant.name}
        </div>

        <div className="text-lg font-semibold text-gray-600">
          <strong>Owner's Name:</strong> {restaurant.ownerName}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <strong>Email:</strong> {restaurant.email}
          </div>
          <div className="w-full sm:w-1/2">
            <strong>Phone Number:</strong> {restaurant.phone}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <strong>License/Registration Number:</strong> {restaurant.liscense}
          </div>
          <div className="w-full sm:w-1/2">
            <strong>Tax Id:</strong> {restaurant.tax}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <strong>Type:</strong> {restaurant.type}
          </div>
          <div className="w-full sm:w-1/2">
            <strong>Operational Hours:</strong> {restaurant.time}
          </div>
        </div>

        <div className="text-gray-600">
          <strong>Description:</strong> {restaurant.description}
        </div>

        <div className="text-gray-600">
          <strong>Address:</strong> {restaurant.address}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <strong>Latitude:</strong> {restaurant.location.lat}
          </div>
          <div className="w-full sm:w-1/2">
            <strong>Longitude:</strong> {restaurant.location.lng}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
