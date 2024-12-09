import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-20 mx-12 md:mx-20 mt-12">
      <div className="cart-items">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>
        <div
          className="grid grid-cols-6 items-center text-gray-500 text-xs md:text-base"
          style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 1fr" }}
        >
          <p className="font-semibold">Image</p>
          <p className="font-semibold">Title</p>
          <p className="font-semibold">Price</p>
          <p className="font-semibold">Quantity</p>
          <p className="font-semibold">Total</p>
          <p className="font-semibold">Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div
                key={item._id}
                className="flex flex-col gap-3 mt-3 bg-gray-50 rounded-lg shadow-md p-4 hover:bg-gray-100 transition duration-300"
              >
                <div
                  className="grid grid-cols-6 items-center text-xs md:text-base"
                  style={{ gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 1fr" }}
                >
                  <img
                    className="w-10 md:w-20 rounded-3xl"
                    src={url + "/images/" + item.image}
                    alt={item.name}
                  />
                  <p className="text-gray-700 font-medium">{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs.{item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cursor-pointer text-red-500 text-lg pl-4"
                  >
                    <Icon icon="mdi:trash-can-outline" width="24" height="24" />
                  </p>
                </div>
                <hr className="pb-3" />
              </div>
            );
          }
        })}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between text-[#555] mb-2">
              <p>SubTotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-[#555] mb-2">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 150}</p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <p>Total</p>
              <p>
                Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 150}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/order");
            }}
            className="text-white h-12 py-3 w-full md:w-64 rounded-lg bg-violet-900 hover:bg-violet-800 transition duration-300 flex items-center justify-center gap-3 mt-6"
          >
            <Icon icon="mdi:cart-check" width="24" height="24" />
            <span>PROCEED TO CHECKOUT</span>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md">
            <p className="text-[#555] text-lg font-medium">
              Have a promo code?
            </p>
            <p className="text-sm text-gray-600">
              Enter your promo code below for discounts.
            </p>
            <div className="flex items-center bg-slate-200 rounded-md">
              <input
                className="bg-transparent p-2 border-0 outline-0 flex-1 rounded-l-md"
                type="text"
                placeholder="Promo code"
              />
              <button className="w-48 p-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition duration-300">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
