import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer bg-[#323232] text-[#d9d9d9] flex flex-col items-center gap-5 py-20 px-[8vw] mt-[100px]">
      <div className="footer-content w-full grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-[30px]">
        <div className="footer-content-left flex flex-col gap-5 items-start">
          <img className="w-32 md:w-48 sm:w-28" src={assets.logo_food} alt="Logo" />
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur, nobis praesentium aperiam natus enim modi ullam dolore eos placeat voluptatem, iste maiores deserunt fuga! In a provident ipsum explicabo illum.
          </p>
          <div className="footer-social-icons flex gap-5">
            <img className="w-10" src={assets.facebook_icon} alt="Facebook" />
            <img className="w-10" src={assets.twitter_icon} alt="Twitter" />
            <img className="w-10" src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center flex flex-col gap-5">
          <h2 className="text-white cursor-pointer font-semibold text-lg">Company</h2>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">About Us</li>
            <li className="cursor-pointer hover:text-white">Delivery</li>
            <li className="cursor-pointer hover:text-white">Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right flex flex-col gap-5">
          <h2 className="text-white cursor-pointer font-semibold text-lg">GET IN TOUCH</h2>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-white">+977 9846572383</li>
            <li className="cursor-pointer hover:text-white">contact@food.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] bg-gray-500 my-2 border-none" />
      <p className="footer-copyright text-center">Copyright 2024 © FoodDel.com - All Right Reserved.</p>
    </div>
  );
};

export default Footer;
