import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const OrderList = ({ url, status }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch orders by status
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        params: { status },
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  // Function to handle status change
  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });
      if (response.data.success) {
        fetchOrders(); // Refresh orders after updating status
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [url, status]);

  // Define the possible status transitions
  const statusOptions = {
    "On Process": ["Food Processing", "Out for Delivery", "Delivered"],
    "Food Processing": ["Out for Delivery", "Delivered"],
    "Out for Delivery": ["Delivered"],
    Delivered: [],
  };

  return (
    <div className="px-2 md:px-4 lg:px-8 py-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{status} Orders</h2>
      <div className="flex flex-col gap-8">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Order Header */}
              <div className="flex items-center mb-4 lg:mb-0">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                  className="w-14 h-14 rounded-full border bg-gray-200 p-2"
                />
                <div className="ml-4">
                  <p className="text-xl font-semibold text-gray-800">
                    Order #{index + 1}
                  </p>
                  <p className="text-sm text-gray-500">
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
                  {order.address.country}
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
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="w-full px-4 py-2 rounded-lg border bg-white text-gray-700 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-400 appearance-none"
                >
                  <option value={order.status} disabled>
                    {order.status}
                  </option>
                  {statusOptions[order.status].map((nextStatus) => (
                    <option key={nextStatus} value={nextStatus}>
                      {nextStatus}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
