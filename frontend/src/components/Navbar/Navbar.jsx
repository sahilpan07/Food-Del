import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev); // Toggle dropdown state
  };

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
  return (
    <div className="navbar flex py-5 justify-between items-center">
      <Link to="/">
        <img src={assets.logo_food} className="w-24 pointer md:w-32 sm:w-28" />
      </Link>
      <ul className="hidden 2xl:flex 2xl:gap-5 2xl:text-[18px] 2xl:text-[#49557e] xl:text-[17px] md:gap-[20px] lg:text-[16px] lg:gap-[15px] md:flex">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""}
        >
          Home
        </Link>
        <Link
          to="/menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""}
        >
          Menu
        </Link>
        <Link
          to="/restaurant"
          onClick={() => setMenu("restaurant")}
          className={menu === "restaurant" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""}
        >
          Restaurant
        </Link>
        <Link
          to="/contact"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""}
        >
          Contact Us
        </Link>
        <Link
          to="/aboutUs"
          onClick={() => setMenu("aboutUs")}
          className={menu === "aboutUs" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""}
        >
          About Us
        </Link>
      </ul>
      <div className="flex gap-6 items-center">
        <img className="w-5" src={assets.search_icon} alt="" />
        <div className="relative">
          <Link to="/cart">
            <img className="w-5" src={assets.basket_icon} alt="" />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "absolute min-h-[10px] min-w-[10px] bg-[#ff6347] rounded-3xl -top-[8px] -right-[8px] animate-pulse"
            }
          ></div>
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-red-500 text-[16px] text-white border-[1.5px] border-black py-2.5 px-5 rounded-full cursor-pointer hover:bg-red-400 transition-colors duration-200 sm:text-[14px] sm:py-2 sm:px-4 md:text-[15px] md:py-2.5 md:px-5 lg:text-[16px] lg:py-3 lg:px-6"
          >
            Sign in
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt=""
              onClick={toggleDropdown} // Toggle dropdown on click
              className="cursor-pointer"
            />
            {isDropdownOpen && ( // Conditionally render dropdown
              <ul className="absolute right-0 w-28 flex flex-col gap-2 bg-white rounded-lg border border-orange-600 shadow-lg z-10">
                <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                  <img src={assets.bag_icon} alt="" className="mr-2 w-4" />
                  <p className="text-md hover:text-orange-500 cursor-pointer">Orders</p>
                </li>
                <hr />
                <li onClick={logout} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                  <img src={assets.logout_icon} alt="" className="mr-2 w-4" />
                  <p className="text-md cursor-pointer hover:text-orange-500">Logout</p>
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
