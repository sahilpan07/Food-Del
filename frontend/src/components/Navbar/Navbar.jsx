import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import SearchBar from "../SearchBar/SearchBar";
import { Icon } from "@iconify/react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [category, setCategory] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    console.log(token);

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
        <img className="hidden sm:block w-36" src={assets.logo} alt="Logo" />
        <img
          className="block sm:hidden w-12"
          src={assets.logo_mobile}
          alt="Logo"
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden 2xl:flex 2xl:gap-5 2xl:text-lg 2xl:text-[#49557e] xl:text-lg md:gap-4 lg:text-base lg:gap-4 md:flex">
        {menuItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMenu(label.toLowerCase())}
            className={
              menu === label.toLowerCase()
                ? "pb-2 border-b-2 border-[#49557e]"
                : ""
            }
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
        {/* Search Icon */}
        <Icon
          className="text-2xl cursor-pointer"
          icon="mingcute:search-line"
          onClick={() => setSearchOpen(!searchOpen)} // Toggle search dropdown
        />

        {/* Search Dropdown */}
        {searchOpen && (
          <div
            className={`${
              searchOpen ? "h-screen opacity-100" : " opacity-0"
            } overflow-hidden transition-all duration-300 ease-in-out absolute top-full left-0 right-0 bg-white shadow-lg`}
          >
            <div className="relative p-4 mx-20">
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <Icon icon="mdi:close" className="text-2xl" />
              </button>
              <SearchBar
                setSearchOpen={setSearchOpen}
                setCategory={setCategory}
              />
            </div>
          </div>
        )}

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
          <div className="relative group z-50">
            <Icon
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="cursor-pointer text-4xl sm:text-5xl border border-cyan-700 rounded-full text-cyan-700 hover:bg-cyan-100 transition-all duration-200 ease-in-out"
              icon="mdi:user"
            />
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-gray-300 shadow-lg z-10 transition-transform transform scale-95 origin-top-right duration-200 ease-in-out">
                {/* Profile */}
                <li className="flex items-center p-4 gap-4 hover:bg-cyan-50 cursor-pointer rounded-t-xl transition-all duration-200 ease-in-out">
                  <Icon className="text-cyan-700 text-2xl" icon="mdi:account" />
                  <span className="text-md text-gray-700 hover:text-cyan-600 font-semibold">
                    Profile
                  </span>
                </li>
                {/* Orders */}
                <li className="flex items-center p-4 gap-4 hover:bg-cyan-50 cursor-pointer transition-all duration-200 ease-in-out">
                  <Icon
                    className="text-cyan-700 text-2xl"
                    icon="ph:bag-duotone"
                  />
                  <span className="text-md text-gray-700 hover:text-cyan-600 font-semibold">
                    Orders
                  </span>
                </li>
                {/* Settings */}
                <li className="flex items-center p-4 gap-4 hover:bg-cyan-50 cursor-pointer transition-all duration-200 ease-in-out">
                  <Icon className="text-cyan-700 text-2xl" icon="mdi:cog" />
                  <span className="text-md text-gray-700 hover:text-cyan-600 font-semibold">
                    Settings
                  </span>
                </li>
                {/* Help */}
                <li className="flex items-center p-4 gap-4 hover:bg-cyan-50 cursor-pointer transition-all duration-200 ease-in-out">
                  <Icon
                    className="text-cyan-700 text-2xl"
                    icon="mdi:help-circle"
                  />
                  <span className="text-md text-gray-700 hover:text-cyan-600 font-semibold">
                    Help
                  </span>
                </li>
                <hr className="border-t border-gray-200 mx-3" />
                {/* Logout */}
                <li
                  onClick={logout}
                  className="flex items-center p-4 gap-4 hover:bg-cyan-50 cursor-pointer rounded-b-xl transition-all duration-200 ease-in-out"
                >
                  <Icon
                    className="text-cyan-700 text-2xl"
                    icon="carbon:logout"
                  />
                  <span className="text-md text-gray-700 hover:text-cyan-600 font-semibold">
                    Logout
                  </span>
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
