import React, { useContext, useState, useRef } from 'react';
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { categories, url } = useContext(StoreContext);

  // Ref for the menu container
  const scrollRef = useRef(null);

  // Calculate scroll amount based on screen width (e.g., 20% of screen width)
  const getScrollAmount = () => {
    const screenWidth = window.innerWidth;
    return screenWidth * 0.2; // 20% of the screen width, adjust as needed
  };

  const scroll = (direction) => {
    const scrollAmount = getScrollAmount();
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  return (
    <div className="flex flex-col gap-6" id="explore-menu">
      <div className="flex justify-between items-center my-5 gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-1)}
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-300"
        >
          <span className="text-lg font-semibold">&lt;</span> {/* Left Arrow */}
        </button>

        {/* Category Selection Header with Scrollable Menu */}
        <div
          ref={scrollRef}
          className="flex gap-7 items-center text-center overflow-hidden no-scrollbar"
        >
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => setCategory(prev => (prev === item.name ? "All" : item.name))}
              className={`flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ${category === item.name ? "active" : ""}`}
            >
              <div
                className={`relative rounded-full overflow-hidden w-[7.5vw] min-w-[80px] p-[2px] 
                ${category === item.name ? "border-4 border-orange-500" : ""} 
                transition-all duration-300 transform hover:scale-110`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                />
                <div className={`absolute top-0 left-0 w-full h-full bg-black opacity-20 rounded-full transition-all duration-300 ${category === item.name ? "opacity-40" : ""}`}></div>
              </div>
              <p className="mt-3 text-lg text-gray-600 font-medium transition-all duration-300 hover:text-orange-500">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(1)}
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-300"
        >
          <span className="text-lg font-semibold">&gt;</span> {/* Right Arrow */}
        </button>
      </div>

      {/* Divider */}
      <hr className="my-3 h-[2px] bg-gray-300 border-0 rounded-full" />
    </div>
  );
};

export default ExploreMenu;
