import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const ListRestaurant = ({ url }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Fetch the list of restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${url}/api/restaurants`);
      if (response.data.success) {
        setRestaurants(response.data.data);
        setFilteredRestaurants(response.data.data); // Initialize filtered restaurants
      } else {
        toast.error("Failed to load restaurants.");
      }
    } catch (error) {
      toast.error("Error fetching restaurants.");
    }
  };

  // Handle removal of a restaurant
  const removeRestaurant = async (restaurantId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this restaurant?"
    );

    if (isConfirmed) {
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
    } else {
      toast.info("Restaurant removal canceled");
    }
  };

  // Filter restaurants based on the search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.address.toLowerCase().includes(query)
    );
    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="container mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-semibold text-gray-800">
          Existing Restaurants
        </h3>
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search restaurant..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon icon="mdi:magnify" className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left text-gray-700">SN</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Image
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700 w-5/12">
                Restaurant Name
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Address
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.map((restaurant, index) => (
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
                <td className="py-3 px-4 text-gray-700">
                  {restaurant.address}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-4">
                    <Link
                      onClick={handleScrollToTop}
                      to={`/restaurant/restaurant/${restaurant._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      onClick={handleScrollToTop}
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
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {filteredRestaurants.map((restaurant, index) => (
          <div key={restaurant._id} className="border-b p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={`${url}/images/${restaurant.image}`}
                alt={restaurant.name}
                className="w-24 h-24 object-cover rounded-md shadow-sm mb-4 sm:mb-0"
              />
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-700">
                  {restaurant.name}
                </p>
                <p className="text-gray-600">{restaurant.address}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <Link
                onClick={handleScrollToTop}
                to={`/restaurant/restaurant/${restaurant._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
              <Link
                onClick={handleScrollToTop}
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
  );
};

export default ListRestaurant;
