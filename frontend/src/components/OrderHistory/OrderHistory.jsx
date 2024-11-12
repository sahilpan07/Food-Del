// OrderHistory.jsx

import React from "react";

const OrderHistory = () => {
  const orders = [
    { id: 1, date: "2024-10-01", status: "Delivered", total: "$30.00" },
    { id: 2, date: "2024-10-05", status: "Pending", total: "$45.00" },
    { id: 3, date: "2024-10-10", status: "Delivered", total: "$25.00" },
  ];

  return (
    <div className="order-history bg-white p-6 rounded-xl shadow-md mx-12 md:mx-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
      <div className="order-list space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="order-item p-4 border rounded-lg shadow-sm flex justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{`Order #${order.id}`}</h3>
              <p className="text-sm text-gray-600">{`Date: ${order.date}`}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{`Status: ${order.status}`}</p>
              <p className="text-lg font-semibold text-gray-800">{order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
