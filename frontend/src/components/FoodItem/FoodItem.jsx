import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, restaurant }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="w-full mx-auto rounded-lg shadow-md transition duration-300 animate-fadeIn">
      <div className="relative">
        <img className="w-full rounded-t-lg" src={`${url}/images/${image}`} alt="" />
        {!cartItems[id] ? (
          <img
            className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-full"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 p-1 rounded-full bg-white">
            <img onClick={() => removeFromCart(id)} className="w-7" src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} className="w-7" src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-medium truncate">{name}</p>
          <img className="w-16" src={assets.rating_starts} alt="" />
        </div>
        <p className="text-gray-600 text-xs">{description}</p>
        <p className="text-gray-600 text-xs">{restaurant}</p>
        <p className="text-tomato text-xl font-medium my-2">Rs{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
