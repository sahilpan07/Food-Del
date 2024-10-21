import React from 'react';
import { restaurant_list } from '../../assets/assets';
import { Link } from "react-router-dom";

const ExploreRestaurant = ({ }) => {

    return (
        <div className="flex flex-col gap-5 mx-12 md:mx-20" id="restaurant-menu">
            <h1 className="text-gray-800 text-lg font-semibold">Our Restaurants</h1>
            <p className="max-w-[80%] text-gray-600">
                Welcome to Delicious Bites Online Ordering! Explore our mouthwatering menu featuring a variety of appetizers, main courses, desserts, and beverages delivered right to your door.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-center text-center cursor-pointer">
                {restaurant_list.map((item, index) => (
                    <Link
                        key={index}
                        to="/restaurant"
                        state={item}
                    >
                        <div 
                            className="flex flex-col border text-white bg-[#040A27] border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
                            
                        >
                            <img 
                                className="w-full h-full object-cover" 
                                src={item.restaurant_image} 
                                alt={item.restaurant_name} 
                            />
                            <div className="p-3">
                                <p className=" text-lg font-medium">{item.restaurant_name}</p>
                                <p className="mt-1 text-xs">{item.location}</p>
                                <p className="mt-1 text-xs">{item.restaurant_description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <hr className="my-4 h-[2px] bg-gray-300 border-0" />
        </div>
    );
};

export default ExploreRestaurant;
