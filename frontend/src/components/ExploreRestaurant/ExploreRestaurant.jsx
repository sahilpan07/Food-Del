import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';
import { Icon } from "@iconify/react";

const ExploreRestaurant = () => {

  const { restaurants, url } = useContext(StoreContext);
  const [showMore, setShowMore] = useState(false);

  // Determine the number of restaurants to show
  const displayedRestaurants = showMore ? restaurants : restaurants.slice(0, 12);

  const handleExploreMore = () => {
    setShowMore(true);
  };

  return (
    <div className="flex flex-col gap-10 mx-12 md:mx-20 mt-10" id="restaurant-menu">
      
      {/* Section Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#040A27] mb-4">
          Explore Our Restaurants
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Welcome to Delicious Bites Online Ordering! Explore our mouthwatering menu featuring a variety of appetizers, main courses, desserts, and beverages delivered right to your door.
        </p>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mt-8">
        {displayedRestaurants.map((item, index) => (
          <Link
            key={index}
            to="/restaurant"
            state={item}
          >
            <div className="restaurant-card flex flex-col border-2 text-white bg-[#040A27] border-gray-300 rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
              
              {/* Restaurant Image */}
              <div className="relative w-full h-40 sm:h-48 md:h-56">
                <img
                  className="w-full h-full object-cover rounded-t-lg"
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                />
                {/* Overlay Text */}
                <div className="truncate absolute bottom-2 left-2 text-white font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-md">
                  {item.name}
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Icon icon="ph:location-pin-fill" className="text-lg text-yellow-400" />
                  <p className="text-sm text-gray-400 truncate">{item.address}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <Icon icon="fa-solid:star" className="text-yellow-500 text-lg" />
                  <span className="text-sm font-medium text-white">4.5/5</span>
                </div>
                
                <p className="mt-2 text-xs text-gray-300 truncate">{item.description}</p>
              </div>

              {/* Hover Effect - Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-[#040A27] text-white px-6 py-2 rounded-full border-2 border-white font-semibold transition-all duration-300 hover:bg-white hover:text-[#040A27] hover:border-[#040A27]">
                  Explore Menu
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore More Button */}
      {restaurants.length > 6 && !showMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleExploreMore}
            className="border-2 border-[#040A27] text-[#040A27] py-2 px-6 rounded-lg shadow-lg text-lg hover:bg-gray-200 transition-all"
          >
            Explore More
          </button>
        </div>
      )}

      {/* Section Divider */}
      <hr className="my-8 h-[2px] bg-gray-300 border-0" />
    </div>
  );
};

export default ExploreRestaurant;
