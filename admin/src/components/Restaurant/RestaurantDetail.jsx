import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantDetail = ({ url }) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants/${id}`);
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
    <div className="container mx-auto p-6">
      <h3 className="text-4xl font-semibold text-center mb-8 text-blue-600">
        Restaurant Details
      </h3>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="text-xl font-medium">
          <strong>Name:</strong> {restaurant.name}
        </div>

        <div className="text-lg">
          <strong>Description:</strong> {restaurant.description}
        </div>

        <div className="text-lg">
          <strong>Address:</strong> {restaurant.address}
        </div>

        <div className="text-lg">
          <strong>Latitude:</strong> {restaurant.location.lat}
        </div>

        <div className="text-lg">
          <strong>Longitude:</strong> {restaurant.location.lng}
        </div>

        <div>
          <strong>Image:</strong>
          <div className="flex justify-center mt-4">
            <img
              src={`${url}/images/${restaurant.image}`}
              className="w-72 h-72 object-cover rounded-lg shadow-md"
              alt={restaurant.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
