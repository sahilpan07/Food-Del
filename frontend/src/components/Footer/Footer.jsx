import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className=" relative text-[#d9d9d9] flex flex-col items-center gap-5 py-12 px-[8vw] mt-[100px] bg-gradient-to-r from-purple-500 to-blue-500">
      <div className=" items-center absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className=" w-full items-center grid sm:grid-cols-1 md:grid-cols-3 gap-[30px] relative z-10">
        <div className=" flex flex-col gap-5 items-start">
          <div className=" border border-white p-3 rounded-xl bg-violet-300">
            <img
              className="w-32 md:w-48 sm:w-28"
              src={assets.logo_food}
              alt="Logo"
            />
          </div>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Aspernatur, nobis praesentium aperiam natus enim modi ullam dolore
            eos placeat voluptatem, iste maiores deserunt fuga! In a provident
            ipsum explicabo illum.
          </p>
          <div className=" flex gap-5">
            <img className="w-10" src={assets.facebook_icon} alt="Facebook" />
            <img className="w-10" src={assets.twitter_icon} alt="Twitter" />
            <img className="w-10" src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className=" flex flex-col gap-5 items-center">
          <h2 className="text-white cursor-pointer font-semibold text-lg">
            Company
          </h2>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-white">Home</li>
            <Link onClick={handleScrollToTop} className="cursor-pointer hover:text-white" to="/aboutUs">About Us</Link>
            <li className="cursor-pointer hover:text-white">Delivery</li>
            <li className="cursor-pointer hover:text-white">Privacy Policy</li>
          </ul>
        </div>
        <div className=" flex flex-col gap-5 items-center">
          <h2 className="text-white cursor-pointer font-semibold text-lg">
            GET IN TOUCH
          </h2>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-white">+977 9846572383</li>
            <li className="cursor-pointer hover:text-white">
              contact@food.com
            </li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] bg-gray-500 my-2 border-none" />
      <p className="text-center">
        Copyright 2024 © FoodDel.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
