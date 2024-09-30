import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, restaurant }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='mt-8' id='food-display'>
            <h2 className='text-[min(2vw,24px)] font-semibold'>Top Dishes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-8">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                restaurant={item.restaurant} 
                                price={item.price} 
                                image={item.image} 
                            />
                        );
                    }

                    if (restaurant === "All" || restaurant === item.restaurant) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
