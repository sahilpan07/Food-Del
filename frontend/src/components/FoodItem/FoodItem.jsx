import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  restaurant,
  location,
  restaurant_description,
}) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  // Check for token in localStorage
  const token = localStorage.getItem("token");

  return (
    <div className="w-full rounded-lg text-white bg-[#040A27] shadow-md transition-transform duration-300 sm:max-w-xs md:max-w-sm lg:max-w-md">
      <Link
        to="/foodDetail"
        state={{ id, name, price, description, image, restaurant }}
      >
        <img
          className="h-32 w-full md:h-40 lg:h-48 rounded-t-lg object-cover"
          src={`${url}/images/${image}`}
          alt={name}
        />
      </Link>

      <div className="flex flex-col gap-1 px-2 sm:px-4 py-1">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium truncate">{name}</p>
        </div>
        <p className="text-xs truncate">{description}</p>
        {restaurant && (
          <Link
            to="/restaurant"
            state={{
              restaurant_name: restaurant,
              restaurant_image: image,
              location: location,
              restaurant_description: restaurant_description,
            }}
            className="flex"
          >
            <Icon
              className="text-md text-orange-500"
              icon="system-uicons:location"
            />
            <p className="flex items-center gap-1 text-xs hover:text-orange-500 cursor-pointer truncate">
              {restaurant}
            </p>
          </Link>
        )}
        <div className="flex justify-between items-center">
          <p className="text-tomato text-xl font-medium">Rs {price}</p>
          {token ? (
            !cartItems[id] ? (
              <Icon
                className="text-green-500 text-3xl cursor-pointer"
                onClick={() => addToCart(id)}
                icon="carbon:add-filled"
              />
            ) : (
              <div className="bg-white text-[#040A27] flex items-center gap-1 md:gap-2 rounded-full transition-transform duration-500 cursor-pointer hover:scale-105">
                <Icon
                  className="text-red-500 text-2xl lg:text-3xl"
                  onClick={() => removeFromCart(id)}
                  icon="ep:remove-filled"
                />
                <p>{cartItems[id]}</p>
                <Icon
                  className="text-green-500 text-2xl lg:text-3xl"
                  onClick={() => addToCart(id)}
                  icon="carbon:add-filled"
                />
              </div>
            )
          ) : (
            <p className="text-sm text-gray-400 italic">Login</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
