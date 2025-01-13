import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";

const FoodDetail = () => {
  const location = useLocation();
  const { id, name, price, description, image, restaurant } = location.state;
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  // Check for token in localStorage
  const token = localStorage.getItem("token");
  return (
    <div className="food-detail-container mx-6 sm:mx-12 md:mx-20 mt-12 mb-16">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <img
            src={`${url}/images/${image}`}
            alt={name}
            className="w-full h-80 md:h-[400px] object-cover rounded-2xl shadow-lg "
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-[#333]">{name}</h1>
          <h2 className="text-3xl font-semibold text-[#040A27]">
            {restaurant}
          </h2>
          <p className="text-lg text-gray-700">{description}</p>

          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-col">
              <p className="text-2xl font-semibold text-orange-500">
                Rs {price}
              </p>
            </div>
            <div className="flex items-center gap-6">
              {token ? (
                !cartItems[id] ? (
                  <button
                    onClick={() => addToCart(id)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-5 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:from-green-600 hover:to-green-700 hover:shadow-xl flex items-center gap-3"
                  >
                    <Icon
                      icon="carbon:add-filled"
                      className="text-white text-2xl"
                    />
                    <span className="text-lg font-semibold">Add to Cart</span>
                  </button>
                ) : (
                  <div className="bg-white text-[#040A27] flex items-center gap-4 px-3 py-2 rounded-lg shadow-xl transition-transform duration-300 cursor-pointer hover:scale-105">
                    <button
                      onClick={() => removeFromCart(id)}
                      className="bg-red-500 text-white p-1 rounded-full flex items-center justify-center transition-transform duration-300 transform hover:scale-110"
                    >
                      <Icon className="text-2xl" icon="ep:remove-filled" />
                    </button>

                    <p className="text-xl">{cartItems[id]}</p>

                    <button
                      onClick={() => addToCart(id)}
                      className="bg-green-500 text-white p-1 rounded-full flex items-center justify-center transition-transform duration-300 transform hover:scale-110"
                    >
                      <Icon className="text-2xl" icon="carbon:add-filled" />
                    </button>
                  </div>
                )
              ) : (
                <p className="text-sm text-gray-400 italic">Login</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-600">
          Enjoy your meal from{" "}
          <span className="font-semibold text-[#040A27]">{restaurant}</span>{" "}
          delivered right to your doorstep!
        </p>
        <div className="mt-8">
          <button className="bg-[#040A27] text-white py-3 px-12 rounded-lg shadow-lg text-lg hover:bg-violet-800 transition-all">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
