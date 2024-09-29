import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";


const FoodItem = ({ id, name, price, description, image, restaurant }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="w-full rounded-t-2xl text-white bg-[#040A27] rounded-lg shadow-md transition duration-300 animate-fadeIn">
      <div className="relative">
        <img className="rounded-t-2xl" src={`${url}/images/${image}`} alt="" />
        {!cartItems[id] ? (
          <img
            className="w-10 absolute bottom-4 border-2 bg-[#040A27] border-black p-0.5 right-4 cursor-pointer rounded-full transition-transform duration-500 cursor-pointer hover:scale-105"
            onClick={() => addToCart(id)}
            src={assets.add_icon_green}
            alt=""
          />
        ) : (
          <div className="absolute bg-[#040A27] border border-black bottom-4 right-4 flex items-center gap-2 p-1 rounded-full transition-transform duration-500 cursor-pointer hover:scale-105">
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
        <p className=" text-xs">{description}</p>
        <Link to='/restaurant'>
                <p className="flex items-center gap-1 text-xs hover:text-orange-500 cursor-pointer"><Icon className="text-md text-orange-500" icon="system-uicons:location"/>{restaurant}</p>
        </Link>
        <p className="text-tomato text-xl font-medium">Rs{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
