import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const NearestRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const { url } = useContext(StoreContext);

  useEffect(() => {
    const fetchNearestRestaurants = async () => {
      if (navigator.geolocation) {
        // Get the current location from the browser's geolocation API
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              // Make the API request to get the nearest restaurants
              const response = await axios.get(
                `${url}/api/restaurants/nearest`,
                {
                  params: { lat: latitude, lng: longitude },
                }
              );

              // Set only the first 12 restaurants
              setRestaurants(response.data.data.slice(0, 12));
            } catch (error) {
              setError("Error fetching nearest restaurants");
            }
          },
          (error) => {
            setError("Error getting location");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchNearestRestaurants();
  }, [url]); // Dependency on url context, so it updates if the base URL changes

  return (
    <div className="flex flex-col gap-10 mx-12 md:mx-20 mt-10">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#040A27] mb-4">
          Nearest Restaurants
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Discover the restaurants closest to your location, offering delicious
          dishes right at your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mt-8">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant._id}
            to="/restaurant" // Adjust route to the correct restaurant detail page
            state={restaurant}
          >
            <div className="restaurant-card flex flex-col border-2 text-white bg-[#040A27] border-gray-300 rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="relative w-full h-40 sm:h-48 md:h-56">
                <img
                  className="w-full h-full object-cover rounded-t-lg"
                  src={`${url}/images/${restaurant.image}`}
                  alt={restaurant.name}
                />
                <div className="truncate absolute bottom-2 left-2 text-white font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-md">
                  {restaurant.name}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="ph:location-pin-fill"
                    className="text-lg text-yellow-400"
                  />
                  <p className="text-sm text-gray-400 truncate">
                    {restaurant.address}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Icon
                    icon="fa-solid:star"
                    className="text-yellow-500 text-lg"
                  />
                  <span className="text-sm font-medium text-white">4.5/5</span>
                </div>

                <p className="mt-2 text-xs text-gray-300 truncate">
                  {restaurant.description}
                </p>

                <p className="mt-2">
                  <strong>Distance:</strong>
                  {restaurant.distance
                    ? restaurant.distance.toFixed(2)
                    : "N/A"}{" "}
                  km
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <hr className="my-8 h-[2px] bg-gray-300 border-0" />
    </div>
  );
};

export default NearestRestaurants;
