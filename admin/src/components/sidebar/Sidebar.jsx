import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white shadow-md border border-gray-300">
      <div className="pt-12 pl-8 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-r-0 border-orange-600"
            }`
          }
        >
          <Icon icon="mdi:tab-add" className="w-6 h-6 " />

          <p className="hidden lg:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900  border border-r-0 border-orange-600"
            }`
          }
        >
          <Icon icon="majesticons:list-box" className="w-6 h-6 " />

          <p className="hidden lg:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-r-0 border-orange-600"
            }`
          }
        >
          <Icon icon="material-symbols:orders-rounded" className="w-6 h-6 " />
          <p className="hidden lg:block">Orders</p>
        </NavLink>

        <NavLink
          to="/restaurant"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-r-0 border-orange-600"
            }`
          }
        >
          <Icon icon="material-symbols:orders-rounded" className="w-6 h-6 " />
          <p className="hidden lg:block">Restaurant</p>
        </NavLink>
        
        <NavLink
          to="/category"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 ${
              isActive
                ? "bg-orange-100 text-orange-600 border-l-4 border-orange-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-r-0 border-orange-600"
            }`
          }
        >
          <Icon icon="material-symbols:orders-rounded" className="w-6 h-6 " />
          <p className="hidden lg:block">Category</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
