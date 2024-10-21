import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const socialIcons = [
  {
    icon: "uil:facebook",
    label: "Facebook",
    hoverColor: "hover:text-blue-600",
  },
  {
    icon: "mdi:instagram",
    label: "Instagram",
    hoverColor: "hover:text-pink-500",
  },
  {
    icon: "prime:twitter",
    label: "Twitter",
    hoverColor: "hover:text-blue-600",
  },
  {
    icon: "mingcute:youtube-fill",
    label: "YouTube",
    hoverColor: "hover:text-red-600",
  },
];
const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="mx-12 md:mx-20 rounded-t-xl relative text-black flex flex-col items-center gap-5 py-12 px-8 sm:px-12 mt-20 bg-[#040A27] text-white">
      <div className="flex flex-col md:flex-row  w-full gap-8 items-center relative z-10">
        <div className=" flex flex-col gap-6 items-start md:w-1/2">
          <div className="  p-3 rounded-xl">
            <img
              className="w-32 md:w-48 sm:w-28"
              src={assets.logo_footer}
              alt="Logo"
            />
          </div>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Aspernatur, nobis praesentium aperiam natus enim modi ullam dolore
            eos placeat voluptatem, iste maiores deserunt fuga! In a provident
            ipsum explicabo illum.
          </p>
          <div className="flex gap-5">
            {socialIcons.map(({ icon, label, hoverColor }, index) => (
              <div key={index} className="relative group">
                <Icon
                  className={`text-4xl text-neutral-400 ${hoverColor} cursor-pointer`}
                  icon={icon}
                />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm p-1 rounded">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3  justify-between">
          <div className=" flex flex-col gap-2 sm:gap-5 ">
            <p className=" cursor-pointer font-semibold text-base lg:text-lg">
              Company
            </p>
            <ul className="flex flex-col gap-2">
              <Link className="cursor-pointer hover:text-white" to="/">
                <p className="text-base">Home</p>
              </Link>

              <Link
                onClick={handleScrollToTop}
                className="cursor-pointer hover:text-white"
                to="/aboutPage"
              >
                <p className="text-base">About Us</p>
              </Link>
              <li className="cursor-pointer hover:text-white">
                <p className="text-base">Delivery</p>
              </li>
              <li className="cursor-pointer hover:text-white">
                <p className="text-base ">Privacy Policy</p>
              </li>
            </ul>
          </div>
          <div className=" flex flex-col gap-5 ">
            <p className="cursor-pointer font-semibold text-base ">GET HELP</p>
            <ul className="flex flex-col gap-2">
              <Link
                onClick={handleScrollToTop}
                className="cursor-pointer text-base hover:text-white"
                to="/orderStep"
              >
                <p className="text-base">How to Order?</p>
              </Link>
              <Link
                onClick={handleScrollToTop}
                className="cursor-pointer text-base hover:text-white"
                to="/faq"
              >
                <p className="text-base">FAQs</p>
              </Link>
              <Link
                onClick={handleScrollToTop}
                className="cursor-pointer text-base hover:text-white"
                to="/contact"
              >
                <p className="text-base">Contact Us</p>
              </Link>
            </ul>
          </div>
          <div className=" flex flex-col gap-5 ">
            <p className="cursor-pointer font-semibold text-base ">
              GET IN TOUCH
            </p>
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer  hover:text-white">
                <p className="text-base ">+977 9846572383</p>
              </li>
              <li className="cursor-pointer hover:text-white">
                <p className="text-base ">contact@food.com</p>
              </li>
            </ul>
          </div>
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
