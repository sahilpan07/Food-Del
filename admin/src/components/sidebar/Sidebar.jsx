import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border border-[#a9a9a9]'>
      <div className='pt-12 pl-12 flex flex-col gap-5'>
        <NavLink
          to='/add'
          className={({ isActive }) => 
            `flex items-center gap-4 border border-[#a9a9a9] px-2 py-3 pointer border-r-0 rounded-tl-[4px] rounded-br-[0px] rounded-tr-[0px] rounded-bl-[4px] ${isActive ? 'bg-orange-50 border-orange-600' : ''}`
          }
        >
          <img src={assets.add_icon} alt="" />
          <p className='lg:block hidden'>Add Items</p>
        </NavLink>
        
        <NavLink
          to='/list'
          className={({ isActive }) => 
            `flex items-center gap-4 border border-[#a9a9a9] px-2 py-3 pointer border-r-0 rounded-tl-[4px] rounded-br-[0px] rounded-tr-[0px] rounded-bl-[4px] ${isActive ? 'bg-orange-50 border-orange-600' : ''}`
          }
        >
          <img src={assets.order_icon} alt="" />
          <p className='lg:block hidden'>List Items</p>
        </NavLink>
        
        <NavLink
          to='/orders'
          className={({ isActive }) => 
            `flex items-center gap-4 border border-[#a9a9a9] px-2 py-3 pointer border-r-0 rounded-tl-[4px] rounded-br-[0px] rounded-tr-[0px] rounded-bl-[4px] ${isActive ? 'bg-orange-50 border-orange-600' : ''}`
          }
        >
          <img src={assets.order_icon} alt="" />
          <p className='lg:block hidden'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
