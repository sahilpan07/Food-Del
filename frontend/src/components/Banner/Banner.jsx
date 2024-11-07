import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const bannerData = [
  {
    image: assets.body_5,
    title: "Earn more with us",
    signup: "Partner with us",
    link: "/RestaurantRegistration",
    subtitle: "Signup as a business",
  },
  {
    image: assets.body_6,
    title: "Avail exclusive perks",
    signup: "Ride with us",
    link: "/RidersRegistration",
    subtitle: "Signup as a rider",
  },
];

const Banner = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-8 mx-12 md:mx-20">
      {bannerData.map((banner, index) => (
        <div
          key={index}
          className="relative w-full h-[360px] rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${banner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent"></div>
          <div className="relative flex flex-col text-white text-center pl-12 pb-12  justify-between h-full">
            <div></div>
            <div className="flex flex-col gap-2  text-left ">
              <p className="text-orange-400 font-semibold">{banner.subtitle}</p>
              <p className="text-xl sm:text-lg font-bold">{banner.title}</p>
              <Link to={banner.link}>
                <button
                  to={banner.link}
                  className="w-36 md:w-48 lg:w-64 sm:h-12 bg-violet-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
