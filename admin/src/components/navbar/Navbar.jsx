import React from 'react';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
      <img className="w-36" src={assets.logo} alt="Logo" />

      <img
        className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md transition-transform duration-300 hover:scale-110 cursor-pointer"
        src={assets.profile_image}
        alt="Profile"
      />
    </div>
  );
};

export default Navbar;
