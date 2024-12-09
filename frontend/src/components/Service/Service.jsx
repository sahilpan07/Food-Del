import React from "react";
import { assets } from "../../assets/assets";

const Service = () => {
  const services = [
    {
      image: assets.body_1,
      title: "Easy To Order",
      description: "Order your favorite food with just a few clicks",
    },
    {
      image: assets.body_2,
      title: "Fast Delivery",
      description: "Delivery that is always on time, even faster",
    },
    {
      image: assets.body_3,
      title: "Best Quality",
      description: "Not only fast, for us quality is also number one",
    },
    {
      image: assets.body_4,
      title: "Best Quality",
      description: "Providing the best customer service",
    },
  ];

  return (
    <div className="px-12 md:px-20 flex flex-col gap-10  py-10">
      <div className="flex flex-col gap-3 items-center">
        <p className="text-red-600 text-md md:text-lg font-semibold">
          What we Serve
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text">
          Your Favorite Food
        </h2>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Delivery Partner
        </h2>
      </div>
      <div className="focus:outline-none animate-fadeIn flex flex-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-5">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full items-center flex flex-col gap-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 bg-white"
          >
            <img
              className="w-48  object-cover rounded-md"
              src={service.image}
              alt={service.title}
            />
            <p className="text-lg font-semibold text-gray-800 text-center">
              {service.title}
            </p>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
