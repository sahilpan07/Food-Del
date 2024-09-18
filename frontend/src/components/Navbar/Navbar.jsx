import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <div className="navbar flex py-5 justify-between items-center">
      <Link to="/">
        <img src={assets.logo} className="w-24 pointer md:w-32 sm:w-28" />
      </Link>
      <ul className="hidden 2xl:flex 2xl:gap-5 2xl:text-[18px] 2xl:text-[#49557e] xl:text-[17px] md:gap-[20px] lg:text-[16px] lg:gap-[15px] md:flex">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={
            menu == "home" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""
          }
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={
            menu == "menu" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""
          }
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={
            menu == "mobile-app"
              ? "pb-[2px] border-b-[2px] border-[#49557e]"
              : ""
          }
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={
            menu == "contact-us"
              ? "pb-[2px] border-b-[2px] border-[#49557e]"
              : ""
          }
        >
          Contact us
        </a>
        <Link
          to="/aboutUs"
          onClick={() => setMenu("aboutUs")}
          className={
            menu == "aboutUs" ? "pb-[2px] border-b-[2px] border-[#49557e]" : ""
          }
        >
          About Us
        </Link>
      </ul>
      <div className="flex gap-6 items-center">
        <img className="w-5" src={assets.search_icon} alt="" />
        <div className="relative ">
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
        <button
          onClick={() => setShowLogin(true)}
          className="bg-red-500 text-[16px] text-white border-[1.5px] border-black py-2.5 px-5 rounded-full cursor-pointer hover:bg-red-400 transition-colors duration-200 sm:text-[14px] sm:py-2 sm:px-4 md:text-[15px] md:py-2.5 md:px-5 lg:text-[16px] lg:py-3 lg:px-6"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
