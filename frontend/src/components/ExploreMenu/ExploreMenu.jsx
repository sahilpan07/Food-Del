import React from 'react';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5" id="explore-menu">
      <h1 className="text-gray-800 text-lg font-semibold">Explore Our Menu</h1>
      <p className="max-w-[60%] text-gray-600">
        Welcome to Delicious Bites Online Ordering! Explore our mouthwatering menu featuring a variety of appetizers, main courses, desserts, and beverages delivered right to your door.
      </p>
      <div className="flex gap-7 justify-between items-center text-center my-5 overflow-x-scroll cursor-pointer">
        {menu_list.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setCategory(prev => (prev === item.menu_name ? "All" : item.menu_name))} 
            className={`flex flex-col items-center cursor-pointer ${category === item.menu_name ? "active" : ""}`}
          >
            <img 
              className={`w-[7.5vw] min-w-[80px] rounded-full transition duration-200 p-[2px] ${category === item.menu_name ? "border-4 border-orange-500" : ""}`} 
              src={item.menu_image} 
              alt={item.menu_name} 
            />
            <p className="mt-2 text-gray-500 text-lg">{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className="my-2 h-[2px] bg-gray-300 border-0" />
    </div>
  );
}

export default ExploreMenu;
