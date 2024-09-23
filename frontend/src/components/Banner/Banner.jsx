import React from "react";
import { assets } from "../../assets/assets";

const bannerData = [
  {
    image: assets.body_4,
    title: "Earn more with lower fees",
    signup: "Partner with us",
    subtitle: "Signup as a business",
  },
  {
    image: assets.body_5,
    title: "Avail exclusive perks",
    signup: "Ride with us",
    subtitle: "Signup as a rider",
  },
];

const Banner = () => {
  return (
    <div className="flex gap-8">
      {bannerData.map((banner, index) => (
        <div
          key={index}
          className="relative w-full h-96 rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${banner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent"></div>
          <div className="relative flex flex-col text-white text-center p-0 justify-between h-full">
            <div className="text-left ml-14 mt-0">
              <p className="pt-3 bg-white font-semibold  text-black h-12 top-0 inline-block pl-3 pr-3 rounded-b-lg">
                {banner.title}
              </p>
            </div>
            <div className="flex flex-col gap-3 text-left pl-12 pb-8">
              <p className="text-orange-400 font-semibold">{banner.subtitle}</p>
              <p className="text-3xl font-bold">{banner.title}</p>
              <button className="w-1/3 h-12 bg-violet-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
