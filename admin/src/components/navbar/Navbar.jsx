import React from 'react';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="flex w-full justify-between items-center px-8 py-4 bg-white shadow-md  ">
      <img
        className="hidden sm:block w-36"
        src={assets.logo}
        alt="Logo"
      />
      <img
        className="block sm:hidden w-12"
        src={assets.logo_mobile}
        alt="Logo"
      />

      <img
        className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md transition-transform duration-300 hover:scale-110 cursor-pointer"
        src={assets.profile_image}
        alt="Profile"
      />
    </div>
  );
};

export default Navbar;
