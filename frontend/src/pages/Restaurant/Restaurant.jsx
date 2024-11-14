import React, { useContext } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const location = useLocation();
  const { id, name, description, image, address, type, time } = location.state;
  const { url } = useContext(StoreContext);

  // Ref for scrolling to Food Display section
  const foodDisplayRef = React.useRef(null);

  // Function to scroll to FoodDisplay component
  const handleViewMenuClick = () => {
    foodDisplayRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-12 md:mx-20 mt-10">
      {/* Restaurant Banner */}
      <div
        className="relative w-full h-96 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${url}/images/${image})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>
        <div className="absolute top-1/3 left-1/4 text-white">
          <h1 className="text-4xl font-extrabold text-shadow-md">{name}</h1>
          <p className="text-xl mt-4">{address}</p>
          {/* Display type and time here */}
          <div className="flex gap-4 mt-2 text-lg">
            <p className="font-semibold">{type}</p>
            <p className="text-gray-300">{time}</p>
          </div>
        </div>
      </div>

      {/* Restaurant Details Section */}
      <div className="mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <p className="text-lg text-gray-800">{description}</p>
          <div className="mt-4 flex gap-4 text-gray-600">
            <span>Type: <strong>{type}</strong></span>
            <span>Delivery Time: <strong>{time}</strong></span>
          </div>
          <div className="mt-6 flex gap-6 justify-between items-center">
            <Link to='/cart'>
              <button className="bg-[#040A27] text-white py-3 px-8 rounded-lg shadow-lg text-lg hover:bg-violet-800 transition-all">
                Order Now
              </button>
            </Link>
            {/* Triggering View Menu */}
            <button
              onClick={handleViewMenuClick}
              className="bg-transparent border-2 border-[#040A27] text-[#040A27] py-3 px-8 rounded-lg shadow-lg text-lg hover:bg-[#040A27] hover:text-white transition-all"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Food Display Section */}
      <div ref={foodDisplayRef} className="mt-8">
        <h2 className="text-2xl font-bold text-[#040A27] mb-4">Our Menu</h2>
        <FoodDisplay restaurant={name} />
      </div>

      {/* Rating and Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#040A27] mb-4">Customer Reviews</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Icon icon="fa-solid:star" className="text-yellow-500 text-xl" />
            <span className="text-lg font-semibold">4.5/5</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold">John Doe</span>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </div>
            <p className="text-md text-gray-700">The food was absolutely delicious, and the delivery was quick!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
