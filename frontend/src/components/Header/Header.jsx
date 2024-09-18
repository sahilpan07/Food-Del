import React from "react";
import "./Header.css";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your favourite Food Here
        <div className="flex">
        <TypeAnimation
          sequence={[
            "Fast Delivery & Easy Pickup",
            3000,
            "Feel the Real Taste.",
            3000,
            "Grab Your Benefits.",
            3000,
          ]}
          deletionSpeed={50}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
          className="text-[36px] md:text-[38px] lg:text-[42px] font-extrabold text-primary min-h-[88px]"
        />
        </div>
        </h2>

        <p>
          Easily Order. Order your favourite foods and essentials through
          Foodganj. Quick Delivery. Get your orders delivered to your doorstep
          through our Website
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
