import React from "react";
import MenuFood from "../../components/MenuFood/MenuFood";
import { Icon } from "@iconify/react";

const Menu = () => {
  return (
    <div className="mx-12 md:mx-20 mt-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#040A27] mb-4">
          Explore Our Mouthwatering Menu
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Welcome to Delicious Bites Online Ordering! Browse through our
          extensive menu and satisfy your cravings with a variety of dishes
          delivered straight to your door.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-[#040A27] mb-6 text-center">
          Our Featured Dishes
        </h2>

        <MenuFood />
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 text-lg">
          Have questions? Feel free to{" "}
          <a className="text-[#040A27] font-semibold">contact us</a>. We're here
          to assist you.
        </p>
      </div>
    </div>
  );
};

export default Menu;
