import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image, restaurant }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="w-full rounded-lg text-white bg-[#040A27] shadow-md transition-transform duration-300 hover:scale-105 sm:max-w-xs md:max-w-sm lg:max-w-md">
      <img className="h-32 w-full md:h-40 lg:h-48 rounded-t-lg object-cover" src={`${url}/images/${image}`} alt={name} />
      <div className="flex flex-col gap-1 px-2 sm:px-4 py-1">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium truncate">{name}</p>
        </div>
        <p className="text-xs truncate">{description}</p>
        <Link to="/restaurant">
          <p className="flex items-center gap-1 text-xs hover:text-orange-500 cursor-pointer">
            <Icon className="text-md text-orange-500" icon="system-uicons:location" />
            {restaurant}
          </p>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-tomato text-xl font-medium">Rs{price}</p>
          {!cartItems[id] ? (
            <Icon
              className="text-green-500 text-3xl"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
