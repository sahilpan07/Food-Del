import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo' />
        <ul className="navbar-menu">
          <li>home</li>
          <li>menu</li>
          <li>mobile-app</li>
          <li>contact us</li>
        </ul> 
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbae-search-icon ">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
          </div>
          <button className='bg-slate-500 relative'>sign in</button>
        </div>
    </div>
  )
}

export default Navbar