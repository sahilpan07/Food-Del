import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { assets } from "../../assets/assets";

const Register = () => {
  const navigate = useNavigate();

  const registrationItems = [
    {
      title: "Become a Restaurant Partner",
      description:
        "Expand your reach and grow your business by partnering with us.",
      buttonText: "Register Now",
      buttonLink: "/RestaurantRegistration",
      image: assets.body_5,
      bgColor: "bg-blue-600",
    },
    {
      title: "Become a Delivery Rider",
      description: "Join our rider team and earn while delivering happiness.",
      buttonText: "Register Now",
      buttonLink: "/RidersRegistration",
      image: assets.body_6,
      bgColor: "bg-green-600",
    },
  ];

  const benefits = [
    {
      icon: "mdi:chart-line",
      title: "Grow Your Revenue",
      description: "Reach new customers and increase your sales effortlessly.",
    },
    {
      icon: "mdi:clock-fast",
      title: "Flexible Scheduling",
      description: "Set your availability and work on your own terms.",
    },
    {
      icon: "mdi:shield-check",
      title: "Trusted Platform",
      description: "Partner with a reliable platform that values your success.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Partnering with this platform has been a game-changer for our restaurant!",
      name: "Restaurant Owner",
    },
    {
      quote: "I love the flexibility and support provided to the riders.",
      name: "Delivery Rider",
    },
    {
      quote:
        "This platform has helped us connect with more customers than ever.",
      name: "Restaurant Partner",
    },
  ];

  return (
    <div className="mx-12 md:mx-20 min-h-screen bg-gray-50">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">Partner with Us</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Join our growing network of restaurants and riders. Let’s grow
          together!
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {registrationItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <div className="relative h-[360px]">
              <img
                src={item.image}
                alt={`${item.title} Image`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 mt-4">{item.description}</p>
              <button
                onClick={() => navigate(item.buttonLink)}
                className={`mt-6 ${item.bgColor} text-white px-6 py-2 rounded-md hover:bg-opacity-80`}
              >
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 py-10 mt-16">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Why Partner with Us?
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center items-center mb-4">
                <Icon icon={benefit.icon} className="text-blue-600 text-7xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-10 mt-16">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          What Our Partners Say
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <h4 className="text-lg font-bold text-gray-800 mt-4">{`- ${testimonial.name}`}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
