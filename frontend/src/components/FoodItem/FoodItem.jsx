import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";


const FoodItem = ({ id, name, price, description, image, restaurant }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="w-full mx-auto bg-slate rounded-lg shadow-md transition duration-300 animate-fadeIn">
      <div className="relative">
        <img className="w-full rounded-2xl p-3" src={`${url}/images/${image}`} alt="" />
        {!cartItems[id] ? (
          <img
            className="w-9 absolute bottom-4 p-2 right-4 cursor-pointer rounded-full"
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
      <div className="px-5 py-1">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-medium truncate">{name}</p>
        </div>
        <p className="text-gray-600 text-xs">{description}</p>
        <Link to='/restaurant'>
                <p className="flex items-center gap-1 text-gray-600 text-xs hover:text-orange-500 cursor-pointer"><Icon className="text-md text-orange-500" icon="system-uicons:location"/>{restaurant}</p>
        </Link>
        <p className="text-tomato text-xl font-medium">Rs{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
