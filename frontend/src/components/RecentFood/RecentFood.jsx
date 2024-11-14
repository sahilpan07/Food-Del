import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const RecentFood = () => {
  const [recentFoods, setRecentFoods] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 5 items
  const { url, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  useEffect(() => {
    const fetchRecentFoods = async () => {
      try {
        const response = await axios.get(`${url}/api/food/recent`);
        if (response.data.success) {
          setRecentFoods(response.data.data);
        } else {
          toast.error("Failed to load recent food items.");
        }
      } catch (error) {
        toast.error("Error fetching recent food items.");
      }
    };

    fetchRecentFoods();
  }, [url]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6); // Load 5 more items with each click
  };

  return (
    <div className="mx-12 md:mx-20">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">Recently Added Food</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mt-8 gap-8">
        {recentFoods.length === 0 ? (
          <p>No recent food items available.</p>
        ) : (
          recentFoods.slice(0, visibleCount).map((food, index) => (
            <div
              key={index}
              className="w-full rounded-lg text-white bg-[#040A27] shadow-md transition-transform duration-300 sm:max-w-xs md:max-w-sm lg:max-w-md"
            >
              <Link to="/foodDetail" state={{ id: food._id, name: food.name, price: food.price, description: food.description, image: food.image, restaurant: food.restaurant }}>
                <img
                  className="h-32 w-full md:h-40 lg:h-48 rounded-t-lg object-cover"
                  src={`${url}/images/${food.image}`}
                  alt={food.name}
                />
              </Link>

              <div className="flex flex-col gap-1 px-2 sm:px-4 py-1">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium truncate">{food.name}</p>
                </div>
                <p className="text-xs truncate">{food.description}</p>
                {food.restaurant && (
                  <Link
                    to="/restaurant"
                    state={{
                      restaurant_name: food.restaurant,
                      restaurant_image: food.image,
                      location: food.location,
                      restaurant_description: food.restaurant_description,
                    }}
                  >
                    <p className="flex items-center gap-1 text-xs hover:text-orange-500 cursor-pointer">
                      <Icon className="text-md text-orange-500" icon="system-uicons:location" />
                      {food.restaurant}
                    </p>
                  </Link>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-tomato text-xl font-medium">Rs{food.price}</p>
                  {!cartItems[food._id] ? (
                    <Icon
                      className="text-green-500 text-3xl cursor-pointer"
                      onClick={() => addToCart(food._id)}
                      icon="carbon:add-filled"
                    />
                  ) : (
                    <div className="bg-white text-[#040A27] flex items-center gap-1 md:gap-2 rounded-full transition-transform duration-500 cursor-pointer hover:scale-105">
                      <Icon
                        className="text-red-500 text-2xl lg:text-3xl"
                        onClick={() => removeFromCart(food._id)}
                        icon="ep:remove-filled"
                      />
                      <p>{cartItems[food._id]}</p>
                      <Icon
                        className="text-green-500 text-2xl lg:text-3xl"
                        onClick={() => addToCart(food._id)}
                        icon="carbon:add-filled"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {recentFoods.length > visibleCount && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentFood;
