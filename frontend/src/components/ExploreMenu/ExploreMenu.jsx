import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext'; 

const ExploreMenu = ({ category, setCategory }) => {
  const { categories,url } = useContext(StoreContext);

  return (
    <div className="flex flex-col gap-5" id="explore-menu">
      <div className="flex gap-7 justify-between items-center text-center my-5 overflow-x-scroll cursor-pointer">
        {categories.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setCategory(prev => (prev === item.name ? "All" : item.name))} 
            className={`flex flex-col items-center cursor-pointer ${category === item.name ? "active" : ""}`}
          >
            <img 
              className={`w-[7.5vw] min-w-[80px] rounded-full transition duration-400 p-[2px] ${category === item.name ? "border-4 border-orange-500" : ""}`} 
              src={`${url}/images/${item.image}`} 
              alt={item.name} 
            />
            <p className="mt-2 text-gray-500 text-lg">{item.name}</p>
          </div>
        ))}
      </div>
      <hr className="my-2 h-[2px] bg-gray-300 border-0" />
    </div>
  );
}

export default ExploreMenu;
