import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, restaurant }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='mt-12' id='food-display'>
      <h2 className='text-[min(2vw,28px)] font-extrabold text-[#040A27] mb-6'>
        Top Dishes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-8">
        {food_list.map((item, index) => {
          // Checking category or restaurant filters
          if (category === "All" || category === item.category || restaurant === "All" || restaurant === item.restaurant) {
            return (
              <div
                key={index}
                className="food-item-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <FoodItem 
                  id={item._id} 
                  name={item.name} 
                  description={item.description} 
                  restaurant={item.restaurant} 
                  price={item.price} 
                  image={item.image} 
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
