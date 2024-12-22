import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="mx-12 md:mx-20 bg-gray-50 min-h-screen p-8">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>
        {data.length === 0 ? (
          <div className="flex flex-col gap-6 items-center justify-center bg-white p-10 px-20 rounded-lg shadow-md">
            <div className="relative">
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-gradient-to-br from-violet-300 to-violet-500 blur-xl opacity-40"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-300 to-purple-500 blur-2xl opacity-30"></div>
              <Icon
                icon="mdi:cart-off"
                width="120"
                height="120"
                className="text-violet-500 relative z-10"
              />
            </div>

            <p className="text-lg text-gray-600">You have no orders yet.</p>
            <button
              onClick={() => navigate("/menu")}
              className="text-white px-8 py-3 rounded-lg bg-violet-900 hover:bg-violet-800 transition-transform transform hover:scale-105"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {data.map((order, index) => (
              <div
                key={index}
                className=" bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel Icon"
                    className="w-16 h-16 object-cover rounded-full border-2 border-blue-500"
                  />
                  <div className="flex flex-col space-y-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item.name} x {item.quantity}
                          {index < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    <p className="text-sm text-gray-500">
                      Items: {order.items.length}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xl text-gray-900 font-semibold">
                    Rs {order.amount}.00
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mt-2">
                    <span className="text-green-500 text-lg">&#x25cf;</span>{" "}
                    <b className="ml-1 text-gray-800">{order.status}</b>
                  </p>
                </div>
                <div className="mt-6 items-center">
                  <button
                    onClick={fetchOrders}
                    className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
