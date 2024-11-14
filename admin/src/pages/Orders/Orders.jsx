import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch orders data
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async(event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="w-full bg-gray-50 min-h-screen py-8">
      <div className="px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Orders Overview
        </h2>

        <div className="flex flex-col gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex bg-white shadow-lg rounded-xl border border-gray-200 p-6"
            >
              {/* Order Header (Order Number, Customer) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
                {/* Order Header (Order Number and Customer) */}
                <div className="flex flex-row items-center w-full mb-4">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel Icon"
                    className="w-14 h-14 rounded-full border bg-gray-200 p-2"
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-2xl font-semibold text-gray-800">
                      Order #{index + 1}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                  </div>
                </div>

                {/* Items Column */}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-700">Items:</p>
                  {order.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-600">
                      {item.name} x {item.quantity}
                    </p>
                  ))}
                </div>

                {/* Shipping Address Column */}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-700">
                    Shipping Address:
                  </p>
                  <p className="text-gray-600">{order.address.street}</p>
                  <p className="text-gray-600">
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country} - {order.address.zipcode}
                  </p>
                  <p className="text-gray-600">Phone: {order.address.phone}</p>
                </div>

                {/* Order Summary Column */}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-700">
                    Order Summary:
                  </p>
                  <p className="text-gray-600">Items: {order.items.length}</p>
                  <p className="text-gray-600">Amount: Rs {order.amount}</p>
                </div>

                {/* Order Status Column */}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-700">
                    Order Status:
                  </p>
                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="w-full px-4 py-2 rounded-lg border bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400 shadow-lg appearance-none">
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>  
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
