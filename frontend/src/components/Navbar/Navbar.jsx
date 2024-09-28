import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { Icon } from "@iconify/react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/explore-res", label: "Restaurant" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="navbar flex py-3 px-12 md:px-20 justify-between items-center">
      <Link to="/" onClick={() => setMenu("home")}>
        <img src={assets.logo_food} className="w-32 pointer md:w-36 sm:w-32" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden 2xl:flex 2xl:gap-5 2xl:text-lg 2xl:text-[#49557e] xl:text-lg md:gap-4 lg:text-base lg:gap-4 md:flex">
        {menuItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMenu(label.toLowerCase())}
            className={menu === label.toLowerCase() ? "pb-2 border-b-2 border-[#49557e]" : ""}
          >
            {label}
          </Link>
        ))}
      </ul>

      {/* Mobile Menu List */}
      {isMobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          {menuItems.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => {
                  setMenu(label.toLowerCase());
                  setMobileMenuOpen(false);
                }}
                className="block p-4 hover:bg-gray-100"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2 sm:gap-3 md:gap-2 lg:gap-5 items-center">
        <Icon className="text-2xl" icon="mingcute:search-line" />
        <div className="relative">
          <Link to="/cart">
            <Icon className="text-2xl" icon="solar:cart-5-bold" />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div className="absolute min-h-2.5 min-w-2.5 bg-[#ff6347] rounded-3xl -top-2 -right-2 animate-pulse" />
          )}
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#040A27] text-white border-[1.5px] border-black rounded-full shadow-lg transition-all duration-200 hover:bg-red-500 hover:shadow-xl flex items-center justify-center space-x-2 text-[14px] py-2 px-2 sm:py-2 md:text-3 md:py-2 md:px-3 lg:text-[16px] lg:py-3 lg:px-6"
          >
            <Icon icon="mdi:login" className="text-white" />
            <span className="text-xs md:text-sm lg:text-base">Sign in</span>
          </button>
        ) : (
          <div className="relative group">
            <Icon
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="cursor-pointer text-4xl sm:text-5xl border border-cyan-700 rounded-full text-cyan-700"
              icon="mdi:user"
            />
            {isDropdownOpen && (
              <ul className="absolute right-0 w-28 flex flex-col gap-2 bg-white rounded-lg border border-orange-600 shadow-lg z-10">
                <li className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                  <Icon className="text-orange-600 text-2xl" icon="ph:bag-duotone" />
                  <p className="text-md hover:text-orange-500 cursor-pointer">Orders</p>
                </li>
                <hr />
                <li onClick={logout} className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                  <Icon className="text-orange-600 text-2xl" icon="carbon:logout" />
                  <p className="text-md cursor-pointer hover:text-orange-500">Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Icon
            icon="ic:outline-menu"
            className="text-2xl cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
