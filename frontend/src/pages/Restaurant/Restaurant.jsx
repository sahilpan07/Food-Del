import React from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useLocation } from "react-router-dom";

const Restaurant = () => {
  const location = useLocation();
  const restaurant = location.state; 

  return (
    <div className="mx-20">
      {restaurant && (
        <div>
          <h1 className="text-2xl font-bold">{restaurant.restaurant_name}</h1>
          <img src={restaurant.restaurant_image} alt={restaurant.restaurant_name} className="w-48" />
          <p className="mt-2 text-lg">{restaurant.location}</p>
          <p>{restaurant.restaurant_description}</p>
          <FoodDisplay restaurant={restaurant.restaurant_name} />
        </div>
      )}
    </div>
  );
};

export default Restaurant;
