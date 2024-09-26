import React from 'react';
import { restaurant_list } from '../../assets/assets';
import { Link } from "react-router-dom";

const ExploreRestaurant = ({ setRestaurant }) => {
    return (
        <div className="flex flex-col gap-5 mx-20" id="restaurant-menu">
            <h1 className="text-gray-800 text-lg font-semibold">Our Restaurants</h1>
            <p className="max-w-[60%] text-gray-600">
                Welcome to Delicious Bites Online Ordering! Explore our mouthwatering menu featuring a variety of appetizers, main courses, desserts, and beverages delivered right to your door.
            </p>
            <div className="grid grid-cols-6 gap-4 items-center text-center cursor-pointer">
                {restaurant_list.map((item, index) => (
                    <Link
                        key={index}
                        to="/restaurant"
                        state={item}
                    >
                        <div 
                            className="flex flex-col border border-black items-center"
                            onClick={() => setRestaurant(item.restaurant_name)}
                        >
                            <img 
                                className="w-48 border border-grey-400 transition duration-400 p-[2px]" 
                                src={item.restaurant_image} 
                                alt={item.restaurant_name} 
                            />
                            
                            <p className="mt-2 text-gray-500 text-lg">{item.restaurant_name}</p>
                            <p className="mt-2 text-gray-500 text-md">{item.location}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <hr className="my-2 h-[2px] bg-gray-300 border-0" />
        </div>
    );
};

export default ExploreRestaurant;
