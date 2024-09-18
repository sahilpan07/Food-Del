import React from 'react'
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-2">
        <img className="w-24" src={assets.logo} alt="" />
        <img className="w-10" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar