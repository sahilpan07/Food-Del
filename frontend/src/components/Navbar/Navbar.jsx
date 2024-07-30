import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home")

  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo' />
        <ul className="navbar-menu">
          <Link to='/' onClick={()=>setMenu("home")} className={menu=="home"?"active":""}>Home</Link>
          <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu=="menu"?"active":""}>Menu</a>
          <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu=="mobile-app"?"active":""}>Mobile-app</a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu=="contact-us"?"active":""}>Contact us</a>
        </ul> 
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon ">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
          </div>
          <button onClick={()=>setShowLogin(true)} className='bg-red-500 py-4 px-8 rounded text-xl hover:bg-red-300 transition-color duration-200'>
            Sign in
          </button>
        </div>
    </div>
  )
}

export default Navbar