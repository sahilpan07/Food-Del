import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListRestaurant = ({ url }) => {
  const [restaurants, setRestaurants] = useState([]);

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
    <div className="container mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6">Existing Restaurants</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse hidden sm:block">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left text-gray-700">SN</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Image</th>
              <th className="py-3 px-4 border-b text-left text-gray-700 w-5/12">Restaurant Name</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Address</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={restaurant._id} className="border-b">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={`${url}/images/${restaurant.image}`}
                    alt={restaurant.name}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 text-gray-700">{restaurant.name}</td>
                <td className="py-3 px-4 text-gray-700">{restaurant.address}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-4">
                    <Link
                      to={`/restaurant/restaurant/${restaurant._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/restaurant/editrestaurant/${restaurant._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => removeRestaurant(restaurant._id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Mobile view */}
        <div className="sm:hidden">
          {restaurants.map((restaurant, index) => (
            <div key={restaurant._id} className="border-b p-4 mb-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={`${url}/images/${restaurant.image}`}
                  alt={restaurant.name}
                  className="w-24 h-24 object-cover rounded-md shadow-sm mb-4 sm:mb-0"
                />
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-700">{restaurant.name}</p>
                  <p className="text-gray-600">{restaurant.address}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                <Link
                  to={`/restaurant/restaurant/${restaurant._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
                <Link
                  to={`/restaurant/editrestaurant/${restaurant._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => removeRestaurant(restaurant._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default ListRestaurant;
