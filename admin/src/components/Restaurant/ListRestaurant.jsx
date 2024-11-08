// ListRestaurant.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListRestaurant = ({ url }) => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${url}/api/restaurants`);
        if (response.data.success) {
          setRestaurants(response.data.data);
        } else {
          toast.error("Failed to load restaurants.");
        }
      } catch (error) {
        toast.error("Error fetching restaurants.");
      }
    };

    fetchRestaurants();
  }, []);

  const removeRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(
        `${url}/api/restaurants/${restaurantId}`
      );
      if (response.data.success) {
        setRestaurants(
          restaurants.filter((restaurant) => restaurant._id !== restaurantId)
        );
        toast.success("Restaurant removed successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing restaurant.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-3xl font-semibold text-center mb-6">
        Existing Restaurants
      </h3>
      <ul className="space-y-4">
        {restaurants.map((restaurant) => (
          <li
            key={restaurant._id}
            className="flex justify-between items-center p-4 bg-white border rounded-md shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`${url}/images/${restaurant.image}`}
                className="w-16 h-16 object-cover rounded-lg"
                alt={restaurant.name}
              />
              <span className="text-lg font-medium">{restaurant.name}</span>
            </div>
            <div className="space-x-4">
              <Link
                to={`/restaurant/restaurant/${restaurant._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <Link
                to={`/restaurant/editrestaurant/${restaurant._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => removeRestaurant(restaurant._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRestaurant;
