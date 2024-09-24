import React, { useState } from "react";
import ExploreRestaurant from "../../components/ExploreRestaurant/ExploreRestaurant";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState("All");

  return (
    <div className="mx-12">
      <ExploreRestaurant restaurant={restaurant} setRestaurant={setRestaurant} /> {/* Fixed prop name here */}
      <FoodDisplay restaurant={restaurant} />
    </div>
  );
};

export default Restaurant;
