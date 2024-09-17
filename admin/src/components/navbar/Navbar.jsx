import React from 'react'
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-2">
        <img className="" src={assets.logo} alt="" />
        <img className="" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar