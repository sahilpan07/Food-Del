import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); 
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar flex py-3 px-12 md:px-20 justify-between items-center">
      <Link to="/">
        <img src={assets.logo_food} className="w-32 pointer md:w-36 sm:w-32" />
      </Link>
      <ul className="hidden 2xl:flex 2xl:gap-5 2xl:text-lg 2xl:text-[#49557e] xl:text-lg md:gap-4 lg:text-base lg:gap-4 md:flex">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={
            menu === "home" ? "pb-2 border-b-2 border-[#49557e]" : ""
          }
        >
          Home
        </Link>
        <Link
          to="/menu"
          onClick={() => setMenu("menu")}
          className={
            menu === "menu" ? "pb-2 border-b-2 border-[#49557e]" : ""
          }
        >
          Menu
        </Link>
        <Link
          to="/explore-res"
          onClick={() => setMenu("restaurant")}
          className={
            menu === "restaurant"
              ? "pb-2 border-b-2 border-[#49557e]"
              : ""
          }
        >
          Restaurant
        </Link>
        <Link
          to="/contact"
          onClick={() => setMenu("contact")}
          className={
            menu === "contact" ? "pb-2 border-b-2 border-[#49557e]" : ""
          }
        >
          Contact Us
        </Link>
      </ul>
      <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
        <img className="w-5" src={assets.search_icon} alt="" />
        <div className="relative">
          <Link to="/cart">
            <img className="w-5" src={assets.basket_icon} alt="" />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "absolute min-h-2.5 min-w-2.5 bg-[#ff6347] rounded-3xl -top-2 -right-2 animate-pulse"
            }
          ></div>
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#040A27] text-4 text-white border-[1.5px] border-black py-2.5 px-5 rounded-full shadow-lg transition-all duration-200 hover:bg-red-500 hover:shadow-xl flex items-center justify-center space-x-2 sm:text-[14px] sm:py-2 sm:px-4 md:text-[15px] md:py-2.5 md:px-5 lg:text-[16px] lg:py-3 lg:px-6"
          >
            <Icon icon="mdi:login" className="text-white" />
            <span>Sign in</span>
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt=""
              onClick={toggleDropdown}
              className="cursor-pointer"
            />
            {isDropdownOpen && (
              <ul className="absolute right-0 w-28 flex flex-col gap-2 bg-white rounded-lg border border-orange-600 shadow-lg z-10">
                <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                  <img src={assets.bag_icon} alt="" className="mr-2 w-4" />
                  <p className="text-md hover:text-orange-500 cursor-pointer">
                    Orders
                  </p>
                </li>
                <hr />
                <li
                  onClick={logout}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                >
                  <img src={assets.logout_icon} alt="" className="mr-2 w-4" />
                  <p className="text-md cursor-pointer hover:text-orange-500">
                    Logout
                  </p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
