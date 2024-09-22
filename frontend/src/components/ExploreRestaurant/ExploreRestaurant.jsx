import React from 'react';
import { restaurant_list } from '../../assets/assets';

const ExploreRestaurant = ({ restaurant, setRestaurant }) => {
    return (
        <div className="flex flex-col gap-5" id="restaurant-menu">
            <h1 className="text-gray-800 text-lg font-semibold">Our Restaurants</h1>
            <p className="max-w-[60%] text-gray-600">
                Welcome to Delicious Bites Online Ordering! Explore our mouthwatering menu featuring a variety of appetizers, main courses, desserts, and beverages delivered right to your door.
            </p>
            <div className="flex gap-7 justify-between items-center text-center my-5 overflow-x-scroll cursor-pointer">
                {restaurant_list.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => setRestaurant(prev => (prev === item.restaurant_name ? "All" : item.restaurant_name))} 
                        className={`flex flex-col items-center cursor-pointer ${restaurant === item.restaurant_name ? "active" : ""}`}
                    >
                        <img 
                            className={`w-[7.5vw] min-w-[80px] rounded-full transition duration-200 ${restaurant === item.restaurant_name ? "border-4 border-tomato-500" : ""}`} 
                            src={item.restaurant_image} 
                            alt={item.restaurant_name} 
                        />
                        <p className="mt-2 text-gray-500 text-lg">{item.restaurant_name}</p>
                    </div>
                ))}
            </div>
            <hr className="my-2 h-[2px] bg-gray-300 border-0" />
        </div>
    );
};

export default ExploreRestaurant;
